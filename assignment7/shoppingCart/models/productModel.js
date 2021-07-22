const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  product: String,
  data: String,
  price: Number,
});

module.exports = mongoose.model('Product', productSchema);
