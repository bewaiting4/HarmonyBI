var express = require('express');
var app = express();
var config = require('./config/config');
var logger = require('./util/logger');

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('../public'));

// Setup the app middlware.
require('./middleware/appMiddlware')(app);

// Default page.
app.get('/', function (req, res) {
	res.send('Harmony BI');
});

// Setup the api.
var api = require('./routes/api/api');
app.use('/api', api);

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
