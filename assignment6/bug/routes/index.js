var express = require('express');
var router = express.Router();
const Bug = require('../models/bugModel');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send('Hi');
});

module.exports = router;
