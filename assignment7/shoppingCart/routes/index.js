var express = require('express');
var router = express();

/* GET home page. */
router.get('/', function (req, res, next) {
  if (req.isAuthenticated()) {
    res.render('/shop');
  } else {
    res.redirect('/users/login');
  }
});

module.exports = router;
