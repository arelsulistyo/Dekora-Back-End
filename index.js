const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const admin = require("firebase-admin");
const connectDB = require("./config/db");
const flowersRouter = require("./routes/flowers");
require("dotenv").config();

const serviceAccount = require(process.env.FIREBASE_SERVICE_ACCOUNT_KEY_PATH);

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connectDB();

app.use("/flowers", flowersRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
