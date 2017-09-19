var morgan = require('morgan');
var bodyParser = require('body-parser');
var auth = require('./authMiddleware');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var mongoose = require('mongoose');
var MongooseStore = require('mongoose-express-session')(expressSession.Store);
var config = require('../config/config');

// setup global middleware here
module.exports = function (app) {

    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(cookieParser(config.secret));
    app.use(expressSession({
        secret: config.secret,
        resave: false,
        saveUninitialized: false,
        store: new MongooseStore({
            connection: mongoose
        })
    }));

    auth(app);
};
