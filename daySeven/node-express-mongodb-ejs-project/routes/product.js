const express = require('express');
const productController = require('../controllers/productController');
const router = express();

const products = [
  { productId: 200, productName: 'RAM' },
  { productId: 201, productName: 'Printer' },
  { productId: 200, productName: 'Scanner' },
];

router.get('/', productController.getAllProducts);

// router.post('/', function (req, res) {
//   Product.create(req.body, (err) => {
//     if (err) throw err;
//     res.send('Product created');
//   });
//   //add headder ('Content-type:application/json') to post data
// });

router.post('/save', productController.saveProduct);

router.get('/create', productController.createProduct);

router.get('/:id', productController.getProductById);

router.post('/delete/:id', productController.deleteProduct);

router.get('/update/:id', productController.updatedProduct);

router.post('/edit/:id', productController.editProduct);

module.exports = router;
