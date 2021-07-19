const express = require('express');
const Product = require('../models/productModel');
const router = express();

const products = [
  { productId: 200, productName: 'RAM' },
  { productId: 201, productName: 'Printer' },
  { productId: 200, productName: 'Scanner' },
];

router.get('/', (req, res, next) => {
  // res.send([products])
  Product.find((err, products) => {
    if (err) throw err;
    // res.send(products)})
    res.render('../views/products/index', { productsList: products });
  });
});

router.post('/', function (req, res) {
  console.log(req.body);
  Product.create(req.body, (err) => {
    if (err) throw err;
    res.send('Product created');
  });
  //add headder ('Content-type:application/json') to post data
});

router.post('/save', (req, res) => {
  let product = new Product(req.body);
  Product.create(product, (err) => {
    if (err) throw err;
    // res.send('Product added.');
    res.redirect('/products');
  });
});

router.get('/create', (req, res) => {
  res.render('../views/products/create');
});

router.get('/:id', (req, res, next) => {
  Product.findById(req.params.id, (err, product) => {
    if (err) throw err;
    res.render('../views/products/product-detail', { product: product });
  });
});

module.exports = router;
