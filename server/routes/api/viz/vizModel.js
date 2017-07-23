var vizData = require('./vizData.json');
var logger = require('../../../util/logger');

vizModel = {
    getVizData: function(filter) {
    	logger.log('Get ' + vizData.length + ' viz data entries.');

        return new Promise((resolve, reject) => {
            return resolve({vizData: vizData});
        });
    }
};

module.exports = vizModel;