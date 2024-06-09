// controllers/cartController.js
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

exports.updateCartItem = async (req, res) => {
  const { userId } = req.params;
  const { flowerId, quantity } = req.body;

  try {
    const existingItem = await Cart.findOne({ userId, flowerId });

    if (existingItem) {
      if (quantity <= 0) {
        await Cart.findByIdAndDelete(existingItem._id);
        res.status(200).json({ message: "Cart item removed" });
      } else {
        existingItem.quantity = quantity;
        await existingItem.save();
        res.status(200).json({ message: "Cart item updated" });
      }
    } else {
      res.status(404).json({ message: "Item not found in cart" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to update cart item", error });
  }
};
