const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { initializeApp, cert } = require("firebase-admin/app");
const serviceAccount = require("./config/firebaseServiceAccountKey.json");
require("dotenv").config();

const connectDB = require("./config/db");

// Initialize Firebase Admin SDK
initializeApp({
  credential: cert(serviceAccount),
});

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
connectDB();

// Routes
const flowerRouter = require("./routes/flowers");
const cartRouter = require("./routes/cart");
const transactionRouter = require("./routes/transactions");
const takeCartRouter = require("./routes/takeCart"); // Add this line

app.use("/flowers", flowerRouter);
app.use("/cart", cartRouter);
app.use("/transactions", transactionRouter);
app.use("/takeCart", takeCartRouter); // Add this line

console.log("Registered routes: ");
console.log(app._router.stack);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
