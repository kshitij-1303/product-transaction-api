const mongoose = require("mongoose");

const ProductTransaction = mongoose.Schema({
  id: Number,
  title: String,
  price: Number,
  description: String,
  category: String,
  image: String,
  sold: Boolean,
  dateOfSale: Date,
});

module.exports = mongoose.model("product transaction", ProductTransaction);
