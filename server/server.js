var express = require('express');
var logger = require('./util/logger');

var app = express();

// Setup app environment.
app.set('view engine', 'ejs');
app.set('views', './public/dist');
app.use(express.static('./public/dist'));

// Setup the app middlware.
require('./middleware/appMiddleware')(app);

// Default page.
app.get('/', function(req, res) {
    res.render('index', { title: 'Express' });
});

app.post('/logout', function (req, res) {
	req.logout();
    res.redirect('/login');
});
// Setup the api.
var api = require('./routes/api/api');
app.use('/api', api);

// Setup the admin page.
var admin = require('./routes/admin/admin');
app.use('/admin', admin);

// Set up global error handling.
app.use(function(err, req, res, next) {
    // If error thrown from jwt validation check.
    if (err.name === 'UnauthorizedError') {
        res.status(401).send('Invalid token');
        return;
    }

    logger.error(err.stack);
    res.status(500).send('Error!');
});

// Export the app.
module.exports = app;