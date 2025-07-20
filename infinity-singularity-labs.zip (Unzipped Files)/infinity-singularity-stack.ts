import * as cdk from 'aws-cdk-lib';
import * as appsync from '@aws-cdk/aws-appsync-alpha';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as logs from 'aws-cdk-lib/aws-logs';
import * as cloudwatch from 'aws-cdk-lib/aws-cloudwatch';
import { Construct } from 'constructs';

export class InfinitySingularityStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // DynamoDB Single Table
    const table = new dynamodb.Table(this, 'InfinitySingularityTable', {
      tableName: 'infinity-singularity-data',
      partitionKey: { name: 'PK', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'SK', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      stream: dynamodb.StreamViewType.NEW_AND_OLD_IMAGES,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      pointInTimeRecovery: true
    });

    // Add GSI for time-based queries
    table.addGlobalSecondaryIndex({
      indexName: 'TimeIndex',
      partitionKey: { name: 'Type', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'Timestamp', type: dynamodb.AttributeType.NUMBER },
    });

    // S3 Bucket for Static Assets and Exports
    const bucket = new s3.Bucket(this, 'InfinitySingularityBucket', {
      bucketName: `infinity-singularity-${cdk.Aws.ACCOUNT_ID}-${cdk.Aws.REGION}`,
      versioned: true,
      cors: [{
        allowedMethods: [s3.HttpMethods.GET, s3.HttpMethods.PUT, s3.HttpMethods.POST],
        allowedOrigins: ['*'],
        allowedHeaders: ['*'],
      }],
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true
    });

    // Lambda Execution Role
    const lambdaRole = new iam.Role(this, 'LambdaExecutionRole', {
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'),
      ],
    });

    // Grant Lambda permissions to DynamoDB and S3
    table.grantReadWriteData(lambdaRole);
    bucket.grantReadWrite(lambdaRole);

    // Orchestration Lambda
    const orchestratorLambda = new lambda.Function(this, 'OrchestratorFunction', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'orchestrator.handler',
      code: lambda.Code.fromAsset('lambda'),
      timeout: cdk.Duration.minutes(15),
      memorySize: 1024,
      role: lambdaRole,
      environment: {
        TABLE_NAME: table.tableName,
        BUCKET_NAME: bucket.bucketName,
      },
      logRetention: logs.RetentionDays.ONE_WEEK,
    });

    // API Vault Lambda
    const apiVaultLambda = new lambda.Function(this, 'APIVaultFunction', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'api-vault.handler',
      code: lambda.Code.fromAsset('lambda'),
      timeout: cdk.Duration.minutes(5),
      memorySize: 512,
      role: lambdaRole,
      environment: {
        TABLE_NAME: table.tableName,
        ENCRYPTION_KEY: 'auto-generated-key-placeholder', // Will be replaced with KMS
      },
      logRetention: logs.RetentionDays.ONE_WEEK,
    });

    // Trace Processor Lambda
    const traceProcessorLambda = new lambda.Function(this, 'TraceProcessorFunction', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'trace-processor.handler',
      code: lambda.Code.fromAsset('lambda'),
      timeout: cdk.Duration.minutes(10),
      memorySize: 1024,
      role: lambdaRole,
      environment: {
        TABLE_NAME: table.tableName,
      },
      logRetention: logs.RetentionDays.ONE_WEEK,
    });

    // AppSync GraphQL API
    const api = new appsync.GraphqlApi(this, 'InfinitySingularityAPI', {
      name: 'infinity-singularity-api',
      definition: appsync.Definition.fromFile('graphql/schema.graphql'),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.API_KEY,
          apiKeyConfig: {
            expires: cdk.Expiration.after(cdk.Duration.days(365)),
          },
        },
      },
      xrayEnabled: true,
      logConfig: {
        fieldLogLevel: appsync.FieldLogLevel.ALL,
        retention: logs.RetentionDays.ONE_WEEK,
      },
    });

    // DynamoDB Data Source
    const dynamoDataSource = api.addDynamoDbDataSource('DynamoDataSource', table);

    // Lambda Data Sources
    const orchestratorDataSource = api.addLambdaDataSource('OrchestratorDataSource', orchestratorLambda);
    const apiVaultDataSource = api.addLambdaDataSource('APIVaultDataSource', apiVaultLambda);
    const traceProcessorDataSource = api.addLambdaDataSource('TraceProcessorDataSource', traceProcessorLambda);

    // GraphQL Resolvers
    dynamoDataSource.createResolver('GetPromptDNAResolver', {
      typeName: 'Query',
      fieldName: 'getPromptDNA',
      requestMappingTemplate: appsync.MappingTemplate.fromString(`
        {
          "version": "2017-02-28",
          "operation": "GetItem",
          "key": {
            "PK": { "S": "PROMPT_DNA#$ctx.args.id" },
            "SK": { "S": "METADATA" }
          }
        }
      `),
      responseMappingTemplate: appsync.MappingTemplate.fromString(`
        $util.toJson($ctx.result)
      `),
    });

    dynamoDataSource.createResolver('ListIntentsResolver', {
      typeName: 'Query',
      fieldName: 'listIntents',
      requestMappingTemplate: appsync.MappingTemplate.fromString(`
        {
          "version": "2017-02-28",
          "operation": "Query",
          "query": {
            "expression": "#type = :type",
            "expressionNames": {
              "#type": "Type"
            },
            "expressionValues": {
              ":type": { "S": "INTENT" }
            }
          },
          "index": "TimeIndex",
          "scanIndexForward": false,
          "limit": $util.defaultIfNull($ctx.args.limit, 20)
        }
      `),
      responseMappingTemplate: appsync.MappingTemplate.fromString(`
        {
          "items": $util.toJson($ctx.result.items),
          "nextToken": $util.toJson($ctx.result.nextToken)
        }
      `),
    });

    orchestratorDataSource.createResolver('LogIntentResolver', {
      typeName: 'Mutation',
      fieldName: 'logIntent',
      requestMappingTemplate: appsync.MappingTemplate.fromString(`
        {
          "version": "2017-02-28",
          "operation": "Invoke",
          "payload": {
            "action": "logIntent",
            "input": $util.toJson($ctx.args.input)
          }
        }
      `),
      responseMappingTemplate: appsync.MappingTemplate.fromString(`
        $util.toJson($ctx.result)
      `),
    });

    apiVaultDataSource.createResolver('TestAPIResolver', {
      typeName: 'Mutation',
      fieldName: 'testAPI',
      requestMappingTemplate: appsync.MappingTemplate.fromString(`
        {
          "version": "2017-02-28",
          "operation": "Invoke",
          "payload": {
            "action": "testAPI",
            "provider": "$ctx.args.provider",
            "credentials": $util.toJson($ctx.args.credentials),
            "testPayload": $util.toJson($ctx.args.testPayload)
          }
        }
      `),
      responseMappingTemplate: appsync.MappingTemplate.fromString(`
        $util.toJson($ctx.result)
      `),
    });

    // CloudWatch Dashboard
    const dashboard = new cloudwatch.Dashboard(this, 'InfinitySingularityDashboard', {
      dashboardName: 'infinity-singularity-monitoring',
    });

    dashboard.addWidgets(
      new cloudwatch.GraphWidget({
        title: 'Lambda Invocations',
        left: [orchestratorLambda.metricInvocations()],
        right: [orchestratorLambda.metricErrors()],
      }),
      new cloudwatch.GraphWidget({
        title: 'DynamoDB Metrics',
        left: [table.metricConsumedReadCapacityUnits()],
        right: [table.metricConsumedWriteCapacityUnits()],
      }),
      new cloudwatch.GraphWidget({
        title: 'AppSync Metrics',
        left: [api.metricRequests()],
        right: [api.metricLatency()],
      })
    );

    // Outputs
    new cdk.CfnOutput(this, 'GraphQLAPIURL', {
      value: api.graphqlUrl,
      description: 'GraphQL API URL',
    });

    new cdk.CfnOutput(this, 'GraphQLAPIKey', {
      value: api.apiKey!,
      description: 'GraphQL API Key',
    });

    new cdk.CfnOutput(this, 'GraphQLWSURL', {
      value: api.graphqlUrl.replace('https://', 'wss://').replace('/graphql', '/graphql'),
      description: 'GraphQL WebSocket URL',
    });

    new cdk.CfnOutput(this, 'DynamoDBTableName', {
      value: table.tableName,
      description: 'DynamoDB Table Name',
    });

    new cdk.CfnOutput(this, 'S3BucketName', {
      value: bucket.bucketName,
      description: 'S3 Bucket Name',
    });

    new cdk.CfnOutput(this, 'DashboardURL', {
      value: `https://console.aws.amazon.com/cloudwatch/home?region=${this.region}#dashboards:name=${dashboard.dashboardName}`,
      description: 'CloudWatch Dashboard URL',
    });
  }
}
