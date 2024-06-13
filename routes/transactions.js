const express = require("express");

const router = express.Router();
const ProductTransaction = require("../models/ProductTransaction");

router.get("/transaction", async (req, res) => {
  const { page, limit } = req.query;

  const allTrasactions = await ProductTransaction.find({})
    .skip(page * limit)
    .limit(limit);
  res.send({ transactions: allTrasactions });
});

module.exports = router;
