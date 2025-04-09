#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config(); // ✅ Load .env file before anything else

const cdk = require('aws-cdk-lib');
const { CartServiceStack } = require('../lib/cart_service-stack');

const app = new cdk.App();
new CartServiceStack(app, 'CartServiceStack');
