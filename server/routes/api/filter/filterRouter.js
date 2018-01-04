var router = require('express').Router();
var logger = require('../../../util/logger');
var _ = require('lodash');
var Filter = require('../../../db/filter/filter');

/* Filter data format sample:
{
    "name": "",

    "create_date": new Date(),

    "user": "",

    "modelData": {
        filter: {
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
            "numbers": [
                {
                    "number": "123",
                    "idigit": "123",
                    "type": "123"
                }
            ]
        },
        "numbers": {},
        "vizData": {},
        "threeMonthCalls": {},
        "suspectTable": {},
        "contactTable": {}
    }
}
*/

// Pre-precess the id.
router.param('id', function (req, res, next, id) {
    Filter.findById(id)
        .populate('user')
        .then(function (filter) {
            if (!filter) {
                next(new Error('No filter with that id'));
            } else {
                req.filter = filter;
                next();
            }
        }, function (err) {
            next(err);
        });
});

router.route('/')
    .get(function (req, res, next) {
        Filter.find({})
            .populate('user')
            .then(function (filters) {
                var result = filters.map(function (filter) {
                    return {
                        id: filter.id,
                        name: filter.name,
                        create_date: filter.create_date,
                        user: {
                            id: filter.user.id,
                            name: filter.user.name
                        }
                    };
                });

                // Send the result without modelData.
                res.json(result);
            }, function (err) {
                next(err);
            });
    })
    .post(function (req, res, next) {
        var filter = req.body;

        // Get modelData from session.
        filter.modelData = req.session.modelData;

        var newFilter = new Filter(filter);

        // Attach the author.
        if (req.session.auth) {
            newFilter.user = req.user;
        }

        newFilter.save(function (err, filter) {
            if (err) {
                next(err);
            }

            res.json({
                _id: filter._id
            });
        });
    });

router.route('/:id')
    .get(function (req, res, next) {
        var modelData = req.filter.modelData || {};

        res.json({
            filter: modelData.filter,
            vizData: modelData.vizData,
            threeMonthCalls: modelData.threeMonthCalls,
            suspectTable: modelData.suspectTable,
            contactTable: modelData.contactTable
        });
    })
    .delete(function (req, res, next) {
        req.filter.remove(function (err, removed) {
            if (err) {
                next(err);
            } else {
                res.json(removed);
            }
        });
    });

module.exports = router;
