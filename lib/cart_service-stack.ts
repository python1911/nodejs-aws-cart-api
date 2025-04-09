import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as path from 'path';

export class CartServiceStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const cartLambda = new NodejsFunction(this, 'CartLambdaHandler', {
      runtime: lambda.Runtime.NODEJS_18_X,
      entry: path.join(__dirname, '../src/lambda.ts'),
      handler: 'handler',
      bundling: {
        externalModules: [],
        nodeModules: [
          '@nestjs/common',
          '@nestjs/core',
          '@nestjs/platform-express',
          'express',
          '@vendia/serverless-express',
        ],
        forceDockerBundling: true,
      },
      environment: {
        PG_HOST: process.env.PG_HOST || '',
        PG_PORT: process.env.PG_PORT || '5432',
        PG_USER: process.env.PG_USER || '',
        PG_PASSWORD: process.env.PG_PASSWORD || '',
        PG_DATABASE: process.env.PG_DATABASE || '',
      },
    });

    new apigateway.LambdaRestApi(this, 'CartAPI', {
      handler: cartLambda,
    });
  }
}
