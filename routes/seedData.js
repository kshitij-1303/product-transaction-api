const express = require("express");
const axios = require("axios");
const Product = require("../models/productModel");

const router = express.Router();

router.use(express.json());

router.get("/data", async (req, res) => {
  // 1. Fetch data from https://s3.amazonaws.com/roxiler.com/product_transaction.json

  axios
    .get("https://s3.amazonaws.com/roxiler.com/product_transaction.json")
    .then((response) => {
      return response.data;
    })
    .then((products) => {
      // 2. Save fetched data in mongo database
      for (const product of products) {
        const item = new Product(product);
        item.save();
      }

      res.send({ message: "Database seed complete" });
    });
});

module.exports = router;
