const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  email: { type: String, required: true },
  itemNo: { type: String, required: true },
  quantity: { type: Number, required: true, default: 1 },
});

const cart = mongoose.model('cartItems', productSchema); //cartItems - DB table name

module.exports = cart;
