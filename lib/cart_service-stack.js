const cdk = require('aws-cdk-lib');
const lambda = require('aws-cdk-lib/aws-lambda');
const apigateway = require('aws-cdk-lib/aws-apigateway');

class CartServiceStack extends cdk.Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    const cartLambda = new lambda.Function(this, 'CartLambdaHandler', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'lambda.handler',
      code: lambda.Code.fromAsset('dist'),
      environment: {
        PG_HOST: process.env.PG_HOST,
        PG_PORT: process.env.PG_PORT || '5432',
        PG_USER: process.env.PG_USER,
        PG_PASSWORD: process.env.PG_PASSWORD,
        PG_DATABASE: process.env.PG_DATABASE,
      }
    });

    new apigateway.LambdaRestApi(this, 'CartAPI', {
      handler: cartLambda
    });
  }
}

module.exports = { CartServiceStack };
