#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { InfinitySingularityStack } from '../lib/infinity-singularity-stack';

const app = new cdk.App();
new InfinitySingularityStack(app, 'InfinitySingularityStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});
