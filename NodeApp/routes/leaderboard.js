var express = require('express');
var router = express.Router();
var leaderboard_controller = require('../controllers/leaderboard_controller');

router.get('/', leaderboard_controller.get_leaderboard);

module.exports = router;
