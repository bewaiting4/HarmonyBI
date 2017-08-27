var router = require('express').Router();

router.get('/', function(req, res) {
    res.render('admin', { title: 'Express' });
});

module.exports = router;