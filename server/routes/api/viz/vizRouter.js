var router = require('express').Router();
var vizModel = require('./vizModel');
var logger = require('../../../util/logger');

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