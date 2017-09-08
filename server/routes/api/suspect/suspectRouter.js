var router = require('express').Router();
var logger = require('../../../util/logger');
var _ = require('lodash');
var Suspect = require('../../../db/suspect/suspect');

/* Suspect data format sample:
{
    number: '',

    // 身份证
    idigit: '',

    name: '',

    type: EnumSuspectType
}
*/

// Pre-precess the id.
router.param('id', function (req, res, next, id) {
    Suspect.findById(id)
        .then(function (suspect) {
            if (!suspect) {
                next(new Error('No suspect with that id'));
            } else {
                req.suspect = suspect;
                next();
            }
        }, function (err) {
            next(err);
        });
});

router.route('/')
    .get(function (req, res, next) {
        Suspect.find({})
            .then(function (suspects) {
                res.json(suspects);
            }, function (err) {
                next(err);
            });
    })
    .post(function (req, res, next) {
        var newSuspect = new Suspect(req.body);

        newSuspect.save(function (err, suspect) {
            if (err) {
                next(err);
            }

            res.json({
                _id: suspect._id
            });
        });
    });

router.route('/:id')
    .get(function (req, res, next) {
        var suspect = req.suspect;
        res.json(suspect);
    })
    .put(function (req, res, next) {
        var suspect = req.suspect,
            update = req.body;

        _.merge(suspect, update);

        suspect.save(function (err, saved) {
            if (err) {
                next(err);
            } else {
                res.json(saved);
            }
        })
    })
    .delete(function (req, res, next) {
        req.suspect.remove(function (err, removed) {
            if (err) {
                next(err);
            } else {
                res.json(removed);
            }
        });
    });

router.route('/number/:number')
    .get(function (req, res, next) {
        Suspect.find({
                number: req.params.number
            })
            .then(function (suspects) {
                res.json(suspects);
            }, function (err) {
                next(err);
            });
    });

/**
 * @deprecated since suspects is part of filter now.
 */
module.exports = router;
