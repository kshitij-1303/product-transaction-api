const ProductTransaction = require("../models/ProductTransaction");

module.exports = async (month) => {
  const products = await ProductTransaction.find({});
  const distinctCategory = {};

  products.forEach((product) => {
    const transactionMonth = new Date(product.dateOfSale).getMonth().toString();

    if (month === transactionMonth) {
      if (product.category in distinctCategory) {
        distinctCategory[product.category]++;
      } else {
        distinctCategory[product.category] = 1;
      }
    }
  });

  return distinctCategory;
};
