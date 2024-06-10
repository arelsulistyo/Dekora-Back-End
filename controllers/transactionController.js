const Transaction = require("../models/transaction.model");

exports.createTransaction = async (req, res) => {
  try {
    const {
      userId,
      items,
      totalAmount,
      shippingAddress,
      paymentMethod,
      shippingMethod,
      productProtection,
    } = req.body;

    const transaction = new Transaction({
      userId,
      items,
      totalAmount,
      shippingAddress,
      paymentMethod,
      shippingMethod,
      productProtection,
    });

    await transaction.save();
    res.status(201).json({ message: "Transaction created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to create transaction", error });
  }
};

exports.getUserTransactions = async (req, res) => {
  try {
    const { userId } = req.params;
    const transactions = await Transaction.find({ userId });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch transactions", error });
  }
};
