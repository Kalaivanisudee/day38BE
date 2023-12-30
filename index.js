//import mongoose
const mongoose = require("mongoose");
const config = require("./utils/config");
console.log('connecting to MongoDb');
//improve dotenv
require("dotenv").config();
//connect to mongodb
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDb");
  })
  .catch((error) => {
    console.log("error connecting to MongoDb", error.message);
  });
