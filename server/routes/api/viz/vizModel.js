var vizData = require('./vizData.json');
var logger = require('../../../util/logger');
var call = require('../../../db/call/call');
var service = require('../../../db/service/service');

function getVizData(filter) {

    // Get result from database.
    return call.getData(filter)
        .then(function (modelData) {
            // Get number service status and
            return service.getData(modelData.numbers, modelData);
        });
}

module.exports = {
    getVizData: getVizData
};
