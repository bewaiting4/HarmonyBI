// Setup configuration first before anything by requiring it.
var config = require('./server/config/config');
var app = require('./server/server');
var logger = require('./server/util/logger');
var config = require('./server/config/config');
var mongoose = require('mongoose');

var startApp = function startApp() {
    app.listen(config.port);
    logger.log('listening on http://localhost:' + config.port);
};

// Connect to MongDB.
mongoose.connect(config.db.url, {
    useMongoClient: true
});

// Set mongoose to use build-in Promise.
mongoose.Promise = global.Promise;

var db = mongoose.connection;

db.on('error', function(err) {
    logger.log(err);
});
db.once('open', function() {
    logger.log('Mongo DB connection estabilished.');

    // Prepare database data for dev.
    if (config.seed) {
        require('./server/db/seed')
            .then(startApp);
    } else {
        startApp();
    }
});