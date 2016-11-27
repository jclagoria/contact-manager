/**
 * Created by jclagoria on 11/26/16.
 */
'use strict';

module.exports = {
    port: 3000,
    hostname: '127.0.0.1',
    baseUrl: 'http://localhost:3000',
    mongodb: {
        uri: 'mongo://localhost/cm_dev_db'
    },
    app : {
        name: 'Contact Manager'
    },
    serviceStatic: true,
    session : {
        type : 'mongo',
        secret : 'u+J%E^9!hx?piXLCfiMY.EDc',
        resave : false,
        saveUninitialized: true
    }
};