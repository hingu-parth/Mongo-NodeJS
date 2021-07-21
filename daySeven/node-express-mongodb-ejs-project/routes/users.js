var express = require('express');
const passport = require('passport');
var router = express.Router();
const User = require('../models/userModel');

const LocalStrategy = require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose');
session = require('express-session');

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

// ---------------------------------------------

router.post('/register', (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    phone: req.body.phone,
    telephone: req.body.telephone,
  });

  User.register(user, req.body.password, (err, user) => {
    if (err) {
      console.log(err);
      res.render('../views/users/register');
    }
  });
  passport.authenticate('local')(req, res, () => {
    res.render('../views/users/login');
  });
});

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/products',
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

module.exports = router;
