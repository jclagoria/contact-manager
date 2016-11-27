/**
 * Created by jclagoria on 11/26/16.
 */
'use strict';

// Get environment or set default environment to development
const ENV = process.env.NODE_ENV || 'development';
const DEFAULT_PORT = 3000;
const DEFAULT_HOSTNAME = '127.0.0.1';

const http = require('http');
const express = require('express');
const config = require('./config');
const app = express();

var server;

// Set express variables
app.set('config', config);
app.set('root', __dirname);
app.set('env', ENV);

requires('./config/mongoose').init(app);
requires('./config/models').init(app);
requires('./config/passport').init(app);
requires('./config/express').init(app);
requires('./config/routes').init(app);

// Start the app if not loaded by another module
if(!module.parent) {
    server = http.createServer(app);
    server.listen(
        config.port || DEFAULT_PORT,
        config.hostname || DEFAULT_HOSTNAME
        /*() => {
            console.log(`${config.app.name} is running`);
            console.log(`   listening on port: ${config.port}`);
            console.log(`   environment: ${ENV.toLowerCase()}`);
        }*/
    );
}

module.exports = app;