var router = require('express').Router();
var vizModel = require('./vizModel');
var logger = require('../../../util/logger');
var enumSuspectType = require('../../../db/suspect/enumSuspectType')

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
                numbers: [],
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

        numbers = filter.numbers = filter.numbers ? JSON.parse(filter.numbers) : [];
        var suspects = [],
            unknowns = [],
            victims = [];
        numbers.forEach(function (number) {
            if (parseInt(number.type, 10) === enumSuspectType.SUSPECT) {
                suspects.push(number);
            } else if (parseInt(number.type, 10) === enumSuspectType.VICTIM) {
                victims.push(number);
            } else {
                unknowns.push(number);
            }
        });
        filter.suspects = suspects;
        filter.unknowns = unknowns;
        filter.victims = victims;

        // Process data.
        vizModel.getVizData(filter)
            .then(function (modelData) {
                logger.log(LOGGER_CLASS + 'Sent viz data');

                req.session.modelData = modelData;

                res.json({
                    vizData: modelData.vizData,
                    threeMonthCalls: modelData.threeMonthCalls,
                    suspectTable: modelData.suspectTable,
                    contactTable: modelData.contactTable
                });
            })
            .catch(function (err) {
                logger.error(err);
                next(err);
            });
    });

module.exports = router;
