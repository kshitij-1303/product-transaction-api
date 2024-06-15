const ProductTransaction = require("../models/ProductTransaction");

module.exports = async (month) => {
  const products = await ProductTransaction.find({});
  let countOfSoldItems = 0;
  let countOfUnsoldItems = 0;

  let monthlyTransactions = [];
  products.map((product) => {
    const transactionMonth = new Date(product.dateOfSale).getMonth().toString();

    if (month === transactionMonth) {
      monthlyTransactions.push(product);
      product.sold ? countOfSoldItems++ : countOfUnsoldItems++;
    }
  });
  return { monthlyTransactions, countOfSoldItems, countOfUnsoldItems };
};
