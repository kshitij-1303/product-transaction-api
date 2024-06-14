const express = require("express");

const router = express.Router();
const ProductTransaction = require("../models/ProductTransaction");

router.get("/transaction", async (req, res) => {
  if (!req.body) {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;

    const allTrasactions = await ProductTransaction.find({})
      .skip(page * limit)
      .limit(limit);

    res.send({ transactions: allTrasactions });
  } else {
    let { searchQuery } = req.body;
    const products = await ProductTransaction.find({});
    searchQuery = searchQuery.toLowerCase();

    const filteredProducts = products.filter((product) => {
      const searchText = product.title + product.description + product.price;
      const lowerCasedSearchText = searchText.toLowerCase();

      if (lowerCasedSearchText.search(searchQuery) == -1) {
        return false;
      }

      return true;
    });

    res.send(filteredProducts);
  }
});

router.get("/statistics/:month", async (req, res) => {
  const { month } = req.params;
  const products = await ProductTransaction.find({});
  console.log(month);
  let countOfSoldItems = 0;
  let countOfUnsoldItems = 0;

  let monthlyTransactions = [];
  products.map(async (product) => {
    const transactionMonth = new Date(product.dateOfSale).getMonth().toString();

    if (month === transactionMonth) {
      monthlyTransactions.push(product);
      product.sold ? countOfSoldItems++ : countOfUnsoldItems++;
    }
  });

  res.send({ monthlyTransactions, countOfSoldItems, countOfUnsoldItems });
});

// router.get("/transaction/:id", async (req, res) => {
//   const { id } = req.params;
//   const transaction = await ProductTransaction.findOne({ id: id });
//   console.log(date);
//   res.send(transaction);
// });

module.exports = router;
