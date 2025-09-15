#!/opt/homebrew/opt/node/bin/node
import * as cdk from 'aws-cdk-lib';
import { BunDockerStack } from '../lib/cdk-bun-docker-stack';

const env = { 
  account: process.env.CDK_DEFAULT_ACCOUNT ?? "",
  region: process.env.CDK_DEFAULT_REGION ?? ""
}

const app = new cdk.App();
new BunDockerStack(app, 'BunDockerStack', {
  env,
});