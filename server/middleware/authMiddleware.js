var everyauth = require('everyauth');
var logger = require('../util/logger');
var config = require('../config/config');
var users = require('../config/users.json');

everyauth.everymodule.findUserById(function(req, userId, callback) {
    callback(undefined, { userId: userId });
});

everyauth.password
    .getLoginPath('/login') // Uri path to the login page
    .postLoginPath('/login') // Uri path that your login form POSTs to
    .loginView('login')
    .authenticate(function(login, password) {
        
        var user = users.find(function(user) {
            return user.login === login && user.password === password;
        });

        if (user) {
            logger.log('User logged in: ' + login);

            return {
                id: user.id,
                login: user.login,
                name: user.name
            };
        } else {
            return ['visible'];
        }



        // Either, we return a user or an array of errors if doing sync auth.
        // Or, we return a Promise that can fulfill to promise.fulfill(user) or promise.fulfill(errors)
        // `errors` is an array of error message strings
        //
        // e.g., 
        // Example 1 - Sync Example
        // if (usersByLogin[login] && usersByLogin[login].password === password) {
        //   return usersByLogin[login];
        // } else {
        //   return ['Login failed'];
        // }
        //
        // Example 2 - Async Example
        // var promise = this.Promise()
        // YourUserModel.find({ login: login}, function (err, user) {
        //   if (err) return promise.fulfill([err]);
        //   promise.fulfill(user);
        // }
        // return promise;
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