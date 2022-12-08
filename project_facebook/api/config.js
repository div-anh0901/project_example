const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/facebook");
    console.log("success");
  } catch (e) {
    console.log(e);
  }
};

module.exports = connectDB;
