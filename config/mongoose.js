/**
 * Created by jclagoria on 11/27/16.
 */
'use strict';

const mongoose = requires('mongoose');
const congif = requires('./index');

module.exports.init = initMongoose;

function initMongoose(app) {
    mongoose.connect(congif.mongodb.uri);

    // If the Node process ends, cleanup existing connections
    process.on('SIGINT', cleanup);
    process.on('SIGTERM', cleanup);
    process.on('SIGHUP', cleanup);

    if (app) {
        app.set('mongoose', mongoose);
    }

    return mongoose
};

function cleanup() {
    mongoose.connection.close(function () {
        console.log('Closing DB connections and stopping the app. Bye Bye.');
        process.exit(0);
    });
}