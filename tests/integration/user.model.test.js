/**
 * Created by jclagoria on 11/28/16.
 */
'use strict';

/**
* Important! Set the environment to test
 */
process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should;
const config = require('../../config');

let mongoose;
let User;
let _user;
let newUserData = {
    email: 'register_user@test.com',
    password: 'user_password',
    name: 'New Test User'
};

describe('User model test', function () {

    before(function(done) {
        mongoose = require('../../config/mongoose').init();
        User = require('../../app/models/user');
        done();
    });

    after(function(done) {
        User.remove({}).exec(err => {
            if (err) throw err;

            mongoose.connection.close(() => {
                setTimeout(function() { done(); }, 1000);
            });
        });
    });


    it('should authenticate a user with valid credentials', done => {
        User.authenticate(newUserData.email, newUserData.password, (err, user) => {
            if (err) throw err;

            should.exist(user);
            should.not.exist(user.password);
            should.not.exist(user.passwordSalt);
            user.email.should.equal(newUserData.email);
            done();
        });
    });

    it('should not authenticate user with invalid credentials', done => {
        User.authenticate(newUserData.email, 'notuserpassowrd', (err, user) => {
            if (err) throw err;

            should.not.exist(user);
            done();
        });
    });


})