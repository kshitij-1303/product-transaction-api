require("dotenv").config();
require("./config/dbConnect");

const express = require("express");
const path = require("path");
const seedDataRouter = require("./routes/seedData");
const transactionRouter = require("./routes/transactions");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

// Routes
app.use("/api", seedDataRouter);
app.use("/api", transactionRouter);

app.get("/", (req, res) => {
  res.render("home.ejs", { message: "Welcome!" });
});

app.listen(PORT, (req, res) => {
  console.log(`Server is running on port ${PORT} `);
});
