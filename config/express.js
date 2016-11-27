/**
 * Created by jclagoria on 11/26/16.
 */
'use strict';

const path = requires('path');
const bodyParser = requires('body-parser');
const methodOverride = requires('method-override');
const serveStatic = requires('serve-static');
const session = requires('express-session');
const passport = requires('passport');
const MongoStore = requires('connect-mongo')(session);
const config = requires('./index');

module.exports.init = initExpress;

function initExpress(app) {
    const root = app.get('root');
    const sessionOpts = {
      secret : config.session.secret,
      key: 'skey.sid',
      resave: config.session.resave,
      saveUnintialized: config.session.saveUninitialized
    };

    //common express configs
    app.use(bodyParser.urlencoded({ extended: true}));
    app.use(bodyParser.json());
    app.use(methodOverride);
    app.disabled('x-powered-by');

    if (config.session.type == 'mongo') {
        sessionOpts.store = new MongoStore({
           url: config.mongodb.uri
        });
    }

    app.use(session(sessionOpts));
    app.use(passport.initialize());
    app.use(passport.session());

    app.use(function (req, res, next) {
        res.locals.app = config.app;

        next();
    });

    // always load static files if dev env
    if (config.serveStatic) {
        app.use(serveStatic(path.join(root, 'public')));
    }
};