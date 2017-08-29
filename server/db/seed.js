var logger = require('../util/logger');
var User = require('./user/user');
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

    var cleanPromises = [User]
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

cleanDB()
    .then(createUsers)
    .catch(logger.log.bind(logger));