const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to DB"));

// const connectDb = async () => {
//   const connect = await mongoose.connect(process.env.MONGO_URI);
//   console.log(
//     "database connected",
//     connect.connection.host,
//     connect.connection.name
//   );
// };
