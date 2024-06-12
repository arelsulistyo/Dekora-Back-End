const Transaction = require("../models/transaction.model");
const FlowerController = require("../controllers/flowerController");
const CartController = require("../controllers/cartController");

exports.createTransaction = async (req, res) => {
  const session = await Transaction.startSession();
  session.startTransaction();

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

    await transaction.save({ session });

    for (const item of items) {
      if (!item.flowerId || !item.quantity) {
        throw new Error("Invalid item format");
      }
      await FlowerController.reduceStock(item.flowerId, item.quantity, session);
    }

    await CartController.removeItemsFromCart(userId, items, session);

    await session.commitTransaction();
    session.endSession();
    res.status(201).json({ message: "Transaction created successfully" });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res
      .status(500)
      .json({ message: "Failed to create transaction", error: error.message });
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
