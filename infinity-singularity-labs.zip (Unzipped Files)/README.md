# Infinity Singularity Labs - AWS Native Application

A complete AWS-native multi-agent orchestration framework with real-time trace visualization, secure API vault, and offline-first capabilities.

## Features

- **AWS CDK Infrastructure**: AppSync, DynamoDB, Lambda, S3, IAM, CloudWatch
- **Astro + Qwik Frontend**: Server-side rendering with client-side hydration
- **Secure API Vault**: Ephemeral credentials with session encryption
- **Real-time Tracing**: WebSocket AppSync subscriptions for live updates
- **Offline-First**: IndexedDB with Dexie + ambient fallback strategies
- **WebAssembly**: Wasmer.js for edge agent processing
- **Export Capabilities**: Full app build and .singularity-bundle.json

## Quick Start

```bash
# Install dependencies
npm install

# Deploy AWS infrastructure
cd infra && npm run deploy

# Start development server
npm run dev
```

## Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Astro + Qwik  │────│   AWS AppSync    │────│   DynamoDB      │
│   Frontend      │    │   GraphQL API    │    │   Single Table  │
└─────────────────┘    └──────────────────┘    └─────────────────┘
        │                       │                       │
        │                       │                       │
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   IndexedDB     │    │   Lambda         │    │   S3 Bucket     │
│   + Dexie       │    │   Orchestration  │    │   Static Assets │
└─────────────────┘    └──────────────────┘    └─────────────────┘
        │                       │                       │
        │                       │                       │
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Wasmer.js     │    │   API Vault      │    │   CloudWatch    │
│   WASM Runtime  │    │   Ephemeral Auth │    │   Monitoring    │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```
