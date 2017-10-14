let router = require('express').Router();
let logger = require('../../../util/logger');

let i2b = require("imageurl-base64");

const LOGGER_CLASS = '/api/image: ';

/* Viz data format sample:
{
    mineType: '',
    base64: '',
    dataUri: ''
}
*/

router.route('/')
    .get(function (req, res, next) {
        //var url = req.query.url;
        var url = req.url.substring(6);

        logger.log(LOGGER_CLASS + 'get image from ' + url);

        i2b(url, function (err, data) {
            if (err) {
                res.json(err);
            } else {
                res.json({
                    mimeType: data.mimeType,
                    dataUri: data.dataUri
                });
            }
        });
    });

module.exports = router;
