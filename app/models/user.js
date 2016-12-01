/**
 * Created by jclagoria on 11/28/16.
 */
'use strict';

const mongoose = require('mongoose');
const passwordHelper = require('../helpers/password');
const Schema = mongoose.Schema;
const _ = require('lodash');

var UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    passwordSalt: {
        type: String,
        required: true,
        select: false
    },
    active: {
        type: Boolean,
        defaul: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

UserSchema.statics.authenticate = authenticateUser;

function authenticateUser(email, password, callback){
    this.findOne({email: email}).select('+password +passwordSalt')
        .exec((err, user) => {
            if (err) {
                return callback(err, null);
            }

            // no user found just return the empy user
            if (!user) {
                return callback(err, user);
            }

            // verify the password with the existing has from the user
            passwordHelper.verify(password, user.password, user.passwordSalt, (err, result) => {
                if (err) {
                    return callback(err, null);
                }

                // if password does not mach don't return user
                if (result == false) {
                    return callback(err, result);
                }

                // remove password and salt from the result
                user.password = undefined;
                user.passwordSalt = undefined;
                // return user if everything is ok
                callback(err, user);
            });
        });
}