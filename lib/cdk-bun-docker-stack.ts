import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as path from 'path';

export class BunDockerStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const fn = new lambda.DockerImageFunction(this, `PocBunDocker`, {
      functionName: `poc-bun-docker`,
      description: 'POC Lambda with Docker',
      code: lambda.DockerImageCode.fromImageAsset(path.join(__dirname, '../lambda')),
      memorySize: 256,
      timeout: cdk.Duration.seconds(120),
    });

    const api = new lambda.FunctionUrl(this, 'PocBunDockerUrl', {
      function: fn,
      authType: lambda.FunctionUrlAuthType.NONE
    });

    new cdk.CfnOutput(this, 'PocBunDockerEndpoint', {
      value: api.url
    });
  }
}
