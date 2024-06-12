const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const newLocal = "../controllers/transactionController";
const transactionController = require(newLocal);

router.post("/create", authMiddleware, transactionController.createTransaction);
router.get(
  "/:userId",
  authMiddleware,
  transactionController.getUserTransactions
);

module.exports = router;
