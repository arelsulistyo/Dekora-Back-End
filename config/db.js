const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://rhafaelc:VXFWd77eAjQI2j1Z@dekora-wrpl.mvqifjy.mongodb.net/?retryWrites=true&w=majority&appName=dekora-wrpl"
    );
    console.log("MongoDB connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
