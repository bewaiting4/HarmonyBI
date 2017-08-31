var router = require('express').Router();
var vizModel = require('./vizModel');
var logger = require('../../../util/logger');

/* Filter data format sample:
{
	// 案发时间
    "date_from": "",
    "date_to": "",

    // 案发地点：以下三选一，顺次查找，如果某一option非空，则使用此option并忽略后续。
    // Option 1: 地图画圈
    "lat": "",
    "long": "",
    "radius": "",
    // Option 2: CI
    "ci_from": [ ],
    "ci_to": [ ],
    // Option 3: 行政区划
    "district": [ ],

    // 案发相关人员
    "idigit": [ ],
    "number": [ ]
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