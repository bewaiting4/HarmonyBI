var router = require('express').Router();

// API router will mount other routers
// for all our resources.
router.get('/', function (req, res) {
    res.send('API');
});

router.use('/viz', require('./viz/vizRouter'));

router.use('/filter', require('./filter/filterRouter'));

router.use('/image', require('./image/imageRouter'));

module.exports = router;
