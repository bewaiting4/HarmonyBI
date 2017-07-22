var vizData = require('./vizData.json');
var logger = require('../../../util/logger');

vizModel = {
    getVizData: function(filter) {
    	logger.log(vizData);

        return new Promise((resolve, reject) => {
            return resolve(vizData);
        });
    }
};

module.exports = vizModel;