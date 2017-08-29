var everyauth = require('everyauth');
var logger = require('../util/logger');
var config = require('../config/config');
var User = require('../db/user/user');

everyauth.everymodule.findUserById(function(req, userId, callback) {
    User.findById(userId, callback);
});

everyauth.password
    .getLoginPath('/login') // Uri path to the login page
    .postLoginPath('/login') // Uri path that your login form POSTs to
    .loginView('login')
    .authenticate(function(login, password) {

        var promise = this.Promise();

        User.findOne({ login, login })
            .then(function(user) {
                if (!user || !user.authenticate(password)) {
                    return promise.fulfill(['visible']);
                } else {
                    logger.log(user.name + ' has logged in.');

                    promise.fulfill(user);
                }

            });

        return promise;
    })
    .loginSuccessRedirect('/') // Where to redirect to after a login
    .getRegisterPath('/register') // Uri path to the registration page
    .postRegisterPath('/register') // The Uri path that your registration form POSTs to
    .registerView('register')
    .validateRegistration(function(newUserAttributes) {

    })
    .registerUser(function(newUserAttributes) {

    })
    .registerSuccessRedirect('/login'); // Where to redirect to after a successful registration


module.exports = function(app) {

    app.post('/login', function(req, res, next) {

        var admin = req.body.admin;

        // Admin login..
        if (admin === 'admin') {
            var login = req.body.login,
                password = req.body.password;

            User.findOne({ login, login })
                .then(function(user) {
                    if (!user || !user.admin || !user.authenticate(password)) {
                        res.render('login', {
                            locals: {
                                errors: 'visible'
                            }
                        });
                    } else {
                        logger.log(user.name + ' has logged in as admin.');

                        res.redirect('/admin');
                    }
                });
        } else {
            // General user login.
            next();
        }
    });

    app.use(everyauth.middleware());

    // Check authentication for all requests.
    app.get('/', function(req, res, next) {
        if (!config.requireLogin || req.session.auth) {
            next();
        } else {
            if (config.dev) {
                logger.log('Please use admin/[blank password] to login.');
            }

            res.redirect('/login');
        }
    });
};