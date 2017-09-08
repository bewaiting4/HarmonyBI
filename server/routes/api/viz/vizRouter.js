var router = require('express').Router();
var vizModel = require('./vizModel');
var logger = require('../../../util/logger');

var LOGGER_CLASS = '/api/viz: ';

/* Viz data format sample:
{
    vizData: Array,
    numbers: Array,
    services: Object
}
*/

router.route('/')
    .post(function (req, res, next) {
        var filter = req.body;

        // Date must be defined. Otherwise the data will be too large to process.
        if (!filter.date_from) {
            logger.log(LOGGER_CLASS + 'No date defined.');

            res.json({
                vizData: [],
                numbsers: [],
                services: []
            });

            return;
        }

        logger.log(LOGGER_CLASS + 'Received filter: ');
        logger.log(filter);

        // Format filter.
        filter.date_from = new Date(filter.date_from || '2016-11-15 00:00:01');
        if (!filter.date_to) {
            var fromDate = new Date(filter.date_from);
            fromDate.setDate(fromDate.getDate() + 1);
            filter.date_to = fromDate;
        } else {
            filter.date_to = new Date(filter.date_to);
        }
        filter.ci_from = filter.ci_from ? filter.ci_from.split(';') : [];
        filter.ci_to = filter.ci_to ? filter.ci_to.split(';') : [];
        filter.district = filter.district ? filter.district.split(';') : [];
        filter.suspects = filter.suspects ? JSON.parse(filter.suspects) : [];

        // Process data.
        vizModel.getVizData(filter)
            .then(function (modelData) {
                logger.log(LOGGER_CLASS + 'Sent viz data');

                res.json(modelData);
            })
            .catch(function (err) {
                logger.error(err);
                next(err);
            });
    });

module.exports = router;
