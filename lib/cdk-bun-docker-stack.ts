import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as ecrAssets from 'aws-cdk-lib/aws-ecr-assets';
import * as path from 'path';

export class BunDockerStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const fn = new lambda.DockerImageFunction(this, `PocBunDocker`, {
      functionName: `poc-bun-docker`,
      description: 'POC Lambda with Docker',
      code: lambda.DockerImageCode.fromImageAsset(path.join(__dirname, '../lambda'), {
        platform: ecrAssets.Platform.LINUX_ARM64,
        file: 'Dockerfile'
      }),
      architecture: lambda.Architecture.ARM_64,
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
