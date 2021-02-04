var express = require('express');
var router = express.Router();
var leaderboard_controller = require('../controllers/leaderboard_controller');

router.get('/', leaderboard_controller.get_leaderboard);
router.get('/api', leaderboard_controller.get_leaderboard_json);

module.exports = router;
