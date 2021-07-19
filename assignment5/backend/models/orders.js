const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  name: String,
  address: String,
  email: String,
  productName: String,
  productPrice: String,
  orderDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);
