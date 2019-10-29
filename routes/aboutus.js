var express = require('express');
var router = express.Router();
var aboutus_controller = require('../controllers/aboutus_controller');

router.get('/', aboutus_controller.get_aboutus);

module.exports = router;
