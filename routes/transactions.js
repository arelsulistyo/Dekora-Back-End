const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transaction.controller");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/create", authMiddleware, transactionController.createTransaction);
router.get(
  "/:userId",
  authMiddleware,
  transactionController.getUserTransactions
);

module.exports = router;
