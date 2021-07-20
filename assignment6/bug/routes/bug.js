var express = require('express');
var router = express();
const Bug = require('../models/bugModel');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('../views/bug/index');
});

router.get('/bugList', function (req, res, next) {
  Bug.find((err, bugList) => {
    if (err) throw err;
    bugList.forEach((bug) => {
      let daysLeft = new Date(Date.now()).getDate() - bug.timeStamp.getDate();
      if (daysLeft <= 0) {
        bug.status = 'Yet to be resolved';
      } else {
        bug.status = daysLeft;
      }
    });

    res.render('../views/bug/bugList', { bug: bugList });
  });
});

//Reporting a bug
router.post('/', (req, res) => {
  const bug = new Bug(req.body);
  console.log(bug);
  Bug.create(bug, (err) => {
    if (err) throw err;
    res.redirect('/bug/bugList');
  });
});

module.exports = router;
