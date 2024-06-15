const ProductTransaction = require("../models/ProductTransaction");
const rangeCount = require("./rangeCount");

module.exports = async (month) => {
  const products = await ProductTransaction.find({});

  const range = new Array(10).fill(0);

  products.map((product) => {
    const transactionMonth = new Date(product.dateOfSale).getMonth().toString();

    if (month === transactionMonth) {
      rangeCount(product.price, range);
    }
  });

  const response = {};
  range.map((ele, index) => {
    const lowerRange = index * 100 + 1;
    let key = `${lowerRange}-${lowerRange + 99}`;
    if (index == 9) {
      key = `${lowerRange} and above`;
    }
    response[key] = ele;
  });

  return response;
};
