const Transaction = require('../models/transaction.model');

exports.createTransaction = async (req, res) => {
  const { userId, items, totalAmount } = req.body;

  try {
    const newTransaction = new Transaction({ userId, items, totalAmount });
    await newTransaction.save();

    res.status(201).json({ message: 'Transaction created' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create transaction', error });
  }
};

exports.getTransactions = async (req, res) => {
  const { userId } = req.params;

  try {
    const transactions = await Transaction.find({ userId });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get transactions', error });
  }
};
