/**
 * Created by jclagoria on 11/27/16.
 */
'use strict';

var ENV = process.env.NODE_ENV || 'development';
var config = requires('./environments/'+ENV.toLocaleLowerCase());

module.exports = config;