var router = require('express').Router();
var logger = require('../../../util/logger');
var _ = require('lodash');
var Filter = require('../../../db/filter/filter');

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

// Pre-precess the id.
router.param('id', function(req, res, next, id) {
    Filter.findById(id)
        .then(function(filter) {
            if (!filter) {
                next(new Error('No filter with that id'));
            } else {
                req.filter = filter;
                next();
            }
        }, function(err) {
            next(err);
        });
});

router.route('/')
    .get(function(req, res, next) {
        Filter.find({})
            .then(function(filters) {
                res.json(filters);
            }, function(err) {
                next(err);
            });
    })
    .post(function(req, res, next) {
        var newFilter = new Filter(req.body);

        // Attach the author.
        if (req.session.auth) {
            newFilter.user = req.session.auth._id;
        }

        newFilter.save(function(err, filter) {
            if (err) {
                next(err);
            }

            res.json({ _id: filter._id });
        });
    });

router.route('/:id')
    .get(function(req, res, next) {
        var filter = req.filter;
        res.json(filter);
    })
    .put(function(req, res, next) {
        var filter = req.filter,
            update = req.body;

        _.merge(filter, update);

        filter.save(function(err, saved) {
            if (err) {
                next(err);
            } else {
                res.json(saved);
            }
        })
    })
    .delete(function(req, res, next) {
        req.filter.remove(function(err, removed) {
            if (err) {
                next(err);
            } else {
                res.json(removed);
            }
        });
    });

module.exports = router;