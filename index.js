require("dotenv").config();
const express = require("express");
const path = require("path");

const PORT = process.env.PORT || 3000;
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.get("/", (req, res) => {
  res.render("home.ejs", { message: "Welcome!" });
});

app.listen(PORT, (req, res) => {
  console.log(`Server is running on port ${PORT} `);
});
