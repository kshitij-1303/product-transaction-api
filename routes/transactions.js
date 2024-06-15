const express = require("express");

const router = express.Router();
const ProductTransaction = require("../models/ProductTransaction");
const rangeCount = require("../utils/rangeCount");
const category = require("../utils/category");
const chart = require("../utils/chart");
const statistics = require("../utils/statistics");

// List all transactions, which also supports search and pagination

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

//  show statistics of a particular month, which also gives sold and unsold product count

router.get("/statistics/:month", async (req, res) => {
  const { month } = req.params;
  const products = await ProductTransaction.find({});
  console.log(month);
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

  res.send({ monthlyTransactions, countOfSoldItems, countOfUnsoldItems });
});

// For bar chart

router.get("/chart/:month", async (req, res) => {
  const { month } = req.params;
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
    console.log(key);

    response[key] = ele;
  });

  res.send({ response });
});

// Find unique categories and number of items  from that category

router.get("/category/:month", async (req, res) => {
  const { month } = req.params;
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

  res.send(distinctCategory);
});

// To get data of all the above mentioned apis

router.get("/all/:month", async (req, res) => {
  const params = req.params;
  const month = params.month;
  console.log(params, month);
  const statisticsVal = await statistics(month);
  const categoryVal = await category(month);
  console.log(categoryVal);
  const chartVal = await chart(month);
  console.log(chartVal);

  res.send({ statisticsVal, categoryVal, chartVal });
});

module.exports = router;
