var vizData = require('./vizData.json');
var logger = require('../../../util/logger');
var viz = require('../../../db/viz/viz');

function getVizData(filter) {

    // Get result from database.
    return viz.getData(filter)
        .then(function (result) {
            return {
                vizData: result.resolvedCalls,
                suspects: result.suspects
            };
        }, function (err) {
            logger.error(err);
        });
}

module.exports = {
    getVizData: getVizData
};
