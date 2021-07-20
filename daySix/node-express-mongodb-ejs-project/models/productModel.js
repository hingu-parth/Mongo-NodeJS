const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  price: {
    type: Number,
    required: true,
    min: [5000, 'Must be greater than 5000 and max 20000'],
    max: 20000,
  },
  quantity: {
    type: Number,
    required: true,
    min: [5, 'Must have 5 products atleast'],
  },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Product', productSchema);
