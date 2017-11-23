var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('index', {title: 'IAMFFz' ,layout: 'partial/shared'});
});
router.get('/scrub', function(req, res) {
    res.render('scrubdomain', {title: 'Scrub' ,layout: 'partial/shared'});
});

module.exports = router;