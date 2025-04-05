#!/usr/bin/env node
const cdk = require('aws-cdk-lib');
const { CartServiceStack } = require('../lib/cart_service-stack');
const app = new cdk.App();
new CartServiceStack(app, 'CartServiceStack', {});
