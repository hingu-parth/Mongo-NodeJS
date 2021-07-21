const mongoose = require('mongoose');
const Product = require('../models/productModel');

module.exports.getAllProducts = (req, res, next) => {
  // res.send([products])
  if (req.isAuthenticated()) {
    Product.find((err, products) => {
      if (err) throw err;
      // res.send(products)})
      res.render('../views/products/index', { productsList: products });
    });
  } else {
    res.render('../views/users/login');
  }
};

module.exports.getProductById = (req, res, next) => {
  Product.findById(req.params.id, (err, product) => {
    if (err) throw err;
    res.render('../views/products/product-detail', { product: product });
  });
};

module.exports.createProduct = (req, res) => {
  res.render('../views/products/create');
};

module.exports.saveProduct = (req, res) => {
  let product = new Product(req.body);
  Product.create(product, (err) => {
    if (err) throw err;
    // res.send('Product added.');
    res.redirect('/products');
  });
};

module.exports.deleteProduct = (req, res) => {
  Product.findById(req.params.id, (err, product) => {
    if (err) throw err;
    if (!product) res.status(404).send('Product doesnot exists.');

    Product.findByIdAndRemove(req.params.id, (er) => {
      if (er) throw er;
      res.redirect('/products');
    });
  });
};

module.exports.editProduct = (req, res) => {
  Product.findById(req.params.id, (err, product) => {
    if (err) throw err;
    if (!product) res.status(404).send('Product doesnot exists.');
    const updatedProduct = {
      name: req.body.name,
      price: req.body.price,
      quantity: req.body.quantity,
    };

    Product.findByIdAndUpdate(req.params.id, updatedProduct, (err) => {
      if (err) throw err;

      res.redirect('/products');
    });
  });
};

module.exports.updatedProduct = (req, res) => {
  Product.findById(req.params.id, (err, product) => {
    if (err) throw err;
    if (!product) res.status(404).send('Product doesnot exists.');
    res.render('../views/products/product-update', { product: product });
  });
};
