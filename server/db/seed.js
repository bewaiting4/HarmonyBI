var logger = require('../util/logger');
var User = require('./user/user');
var Suspect = require('./suspect/suspect');
var Filter = require('./filter/filter');
var seedData = require('./seedData.json');

logger.log('Seeding the Database');

var createDoc = function(model, doc) {
    return new Promise(function(resolve, reject) {
        new model(doc).save(function(err, saved) {
            return err ? reject(err) : resolve(saved);
        });
    });
};

var cleanDB = function() {
    logger.log('... cleaning the DB');

    var cleanPromises = [ User, Suspect, Filter ]
        .map(function(model) {
            return model.remove().exec();
        });

    return Promise.all(cleanPromises);
}

var createUsers = function(data) {

    var promises = seedData.users.map(function(user) {
        return createDoc(User, user);
    });

    return Promise.all(promises)
        .then(function(users) {
            logger.log('Seeded DB with ' + users.length + ' users.');

            return users;
        });
};

var createSuspects = function(data) {

    var promises = seedData.suspects.map(function(suspect) {
        return createDoc(Suspect, suspect);
    });

    return Promise.all(promises)
        .then(function(suspects) {
            logger.log('Seeded DB with ' + suspects.length + ' suspects.');

            return suspects;
        });
};

var createFilters = function(data) {

    var promises = seedData.filters.map(function(filter) {
        return createDoc(Filter, filter);
    });

    return Promise.all(promises)
        .then(function(filters) {
            logger.log('Seeded DB with ' + filters.length + ' filters.');

            return filters;
        });
};

module.exports = cleanDB()
    .then(createUsers)
    .then(createSuspects)
    .then(createFilters)
    .catch(logger.log.bind(logger));