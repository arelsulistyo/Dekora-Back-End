// controllers/cartController.js
const Cart = require("../models/cart.model");
const Flower = require("../models/flower.model");

exports.removeItemsFromCart = async (userId, items, session) => {
  try {
    for (const item of items) {
      await Cart.findOneAndDelete({
        userId: userId,
        flowerId: item.flowerId,
      }).session(session);
    }
  } catch (error) {
    throw new Error("Failed to remove items from cart");
  }
};

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
    const flower = await Flower.findById(flowerId);

    if (!flower) {
      return res.status(404).json({ message: "Flower not found" });
    }

    if (existingItem) {
      if (quantity > flower.stock) {
        return res.status(400).json({
          message: `Requested quantity for ${flower.name} exceeds available stock of ${flower.stock}`,
        });
      }

      if (quantity <= 0) {
        await Cart.findByIdAndDelete(existingItem._id);
        return res.status(200).json({ message: "Cart item removed" });
      } else {
        existingItem.quantity = quantity;
        await existingItem.save();
        return res.status(200).json({ message: "Cart item updated" });
      }
    } else {
      return res.status(404).json({ message: "Item not found in cart" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to update cart item", error });
  }
};
