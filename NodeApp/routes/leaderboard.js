var express = require('express');
var router = express.Router();


router.get('/', function(req, res) {
    res.redirect('/leaderboard');
});

module.exports = router;