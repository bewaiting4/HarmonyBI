var router = require('express').Router();
var vizModel = require('./vizModel');
var logger = require('../../../util/logger');

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
    .post(function(req, res, next) {
        var filter = req.body;

        logger.log('FILTER: ');
        logger.log(filter);

        vizModel.getVizData(filter)
            .then(function(viz) {
                res.json(viz);
            }, function(err) {
                next(err);
            });
    });

module.exports = router;