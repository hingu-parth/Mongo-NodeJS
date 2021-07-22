var express = require('express');
var router = express();
const User = require('../models/userModel');
session = require('express-session');
const passport = require('passport');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', (req, res) => {
  res.render('../views/users/login');
});

router.get('/logout', (req, res) => {
  res.render('../views/users/logout');
});

router.get('/register', (req, res) => {
  res.render('../views/users/register');
});

router.post('/register', (req, res) => {
  console.log(req.body);
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    type: 'off',
  });

  if (req.body.type == 'on') user.type = 'on';
  else {
    user.type = 'off';
  }

  User.register(user, req.body.password, (err, user) => {
    if (err) {
      res.render('../views/users/register');
    }
  });

  res.redirect('/users/login');
});

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/shop',
    failureRedirect: '/users/login',
  }),
  (req, res) => {
    console.log('Trying to login');
  }
);

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/users/login');
});

router.get('/addUser', (req, res) => {
  res.render('../views/users/addUser');
});

// router.get('/userList', (req, res) => {
//   res.render('../views/users/userList');
// });

router.get('/userList', (req, res) => {
  User.find((err, user) => {
    console.log(user);
    if (err) throw err;
    res.render('../views/users/userList', { user: user });
  });
});

router.post('/registerAdmin', (req, res) => {
  console.log(req.body);
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    type: 'off',
  });

  if (req.body.type == 'on') user.type = 'on';
  else {
    user.type = 'off';
  }

  User.register(user, req.body.password, (err, user) => {
    if (err) {
      res.render('../views/users/login');
    }
  });

  res.redirect('/users/userList');
});

module.exports = router;
