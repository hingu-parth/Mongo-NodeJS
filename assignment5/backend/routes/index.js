var express = require('express');
const Order = require('../models/orders');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  Order.find((err, orders) => {
    if (err) throw err;
    res.render('../views/orders/index', { title: 'Express' });
  });
});

router.post('/save', function (req, res, next) {
  const order = new Order(req.body);
  Order.create(order, (err) => {
    if (err) console.log(err);
    res.redirect('/orders');
  });
});

router.get('/orders', function (req, res, next) {
  Order.find((err, orders) => {
    if (err) throw err;
    for (let i = 0; i < orders.length; i++) {
      if (
        new Date(orders[i].orderDate).getDate() ==
        new Date(Date.now()).getDate()
      ) {
        orders[i].status = 'In progress';
      } else if (
        new Date(orders[i].orderDate).getDate() > new Date(Date.now()).getDate()
      ) {
        orders[i].status = 'Dispatched';
      } else if (
        new Date(Date.now()).getDate() -
          new Date(orders[i].orderDate).getDate() >=
        2
      ) {
        orders[i].status = 'Delivered';
      }
    }
    res.render('../views/orders/orderList', {
      orders: orders,
      title: 'Admin Dashboard',
    });
  });
});

module.exports = router;
