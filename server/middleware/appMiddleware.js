var morgan = require('morgan');
var bodyParser = require('body-parser');
var auth = require('./authMiddleware');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');

// setup global middleware here
module.exports = function(app) {

    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(expressSession({
    	secret: 'mstr',
    	resave: false,
    	saveUninitialized: false
    }));

    auth(app);
};