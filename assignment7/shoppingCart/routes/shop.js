const express = require('express');
const router = express();

const Product = require('../models/productModel');

router.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    Product.find((er, products) => {
      if (er) throw er;
      user = res.locals.currentUser;
      console.log(user);
      // if (user.type == u user.type = 'off';
      res.render('../views/shoppingCart/index', {
        products: products,
        user: user,
      });
    });
  } else {
    res.redirect('/users/login');
  }
});

router.post('/product', (req, res) => {
  if (req.isAuthenticated()) {
    product = new Product(req.body);
    console.log(product);
    Product.create(product, (err) => {
      if (err) throw err;
      res.send(product);
    });
  } else {
    res.redirect('/users/login');
  }
});

router.get('/');

module.exports = router;
