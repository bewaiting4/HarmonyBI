var router = require('express').Router();
var vizModel = require('./vizModel');
var logger = require('../../../util/logger');

var LOGGER_CLASS = '/api/viz: ';

/* Viz data format sample:
{
    "_state": 66,
    "f_number": "15292971744",
    "f_name": "",
    "f_lang": "维语",
    "f_long": "78.236862",
    "f_lat": "37.717583",
    "f_IMEI": "35557304609347",
    "f_district": "新疆 和田地区(0903)",
    "f_addr": "和田(0903) 皮山科克铁热克乡阿热克库木村(皮山科克铁热克乡阿热克库木村)",
    "f_CI": "23351",
    "call_start": "2016-11-15 08:35:51",
    "call_end": "2016-11-15 08:36:46",
    "call_duration": "41",
    "t_number": "15199289734",
    "t_name": "",
    "t_lang": "维语",
    "t_long": "78.236862",
    "t_lat": "37.717583",
    "t_IMEI": "86773602192127",
    "t_district": "新疆 和田地区(0903)",
    "t_addr": "和田(0903) 皮山科克铁热克乡阿热克库木村(皮山科克铁热克乡阿热克库木村)",
    "t_CI": "23351"
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
                suspects: []
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
        }
        filter.ci_from = filter.ci_from ? filter.ci_from.split(';') : [];
        filter.ci_to = filter.ci_to ? filter.ci_to.split(';') : [];
        filter.district = filter.district ? filter.district.split(';') : [];
        filter.suspects = filter.suspects ? JSON.parse(filter.suspects) : [];

        // Process data.
        vizModel.getVizData(filter)
            .then(function (viz) {
                logger.log(LOGGER_CLASS + 'Sent viz data');

                res.json(viz);
            })
            .catch(function (err) {
                logger.error(err);
                next(err);
            });
    });

module.exports = router;
