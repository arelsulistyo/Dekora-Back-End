const Cart = require("../models/cart.model");

exports.addItemToCart = async (req, res) => {
  const { userId, flowerId, quantity } = req.body;

  try {
    const existingItem = await Cart.findOne({ userId, flowerId });

    if (existingItem) {
      existingItem.quantity += quantity;
      await existingItem.save();
    } else {
      const newItem = new Cart({ userId, flowerId, quantity });
      await newItem.save();
    }

    res.status(201).json({ message: "Item added to cart" });
  } catch (error) {
    res.status(500).json({ message: "Failed to add item to cart", error });
  }
};

exports.getCartItems = async (req, res) => {
  const { userId } = req.params;

  try {
    const cartItems = await Cart.find({ userId }).populate("flowerId");
    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ message: "Failed to get cart items", error });
  }
};
