const Transaction = require("../models/transaction.model");
const FlowerController = require("../controllers/flowerController");
const CartController = require("../controllers/cartController");
const { coreApi, snap } = require("../config/midtrans"); // Ensure this line imports both coreApi and snap correctly

exports.createTransaction = async (req, res) => {
  const session = await Transaction.startSession();
  session.startTransaction();

  try {
    const {
      userId,
      items,
      totalAmount,
      recipientName,
      shippingAddress,
      paymentMethod,
      shippingMethod,
      productProtection,
    } = req.body;

    const transaction = new Transaction({
      userId,
      items,
      totalAmount,
      recipientName,
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

    // Ensure totalAmount is an integer
    const order_id = transaction._id.toString();
    const parameter = {
      transaction_details: {
        order_id: order_id,
        gross_amount: Math.round(totalAmount), // Convert to integer
      },
      customer_details: {
        first_name: "John", // Replace with actual customer details
        last_name: "Doe", // Replace with actual customer details
        email: "john.doe@example.com", // Replace with actual customer details
        phone: "081234567890", // Replace with actual customer details
      },
    };

    const snapResponse = await snap.createTransaction(parameter);

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      message: "Transaction created successfully",
      transaction: transaction,
      snapToken: snapResponse.token,
    });
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
