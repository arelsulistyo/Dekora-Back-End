const Cart = require("../models/cart.model");
const Flower = require("../models/flower.model");

exports.getUserCart = async (req, res) => {
  try {
    const userId = req.params.userId;
    const cartItems = await Cart.find({ userId: userId })
      .populate("flowerId")
      .exec();

    const items = cartItems.map((item) => ({
      name: item.flowerId.name,
      imageURL: item.flowerId.imageURL,
      type: item.flowerId.type,
      price: item.flowerId.price,
      size: item.flowerId.size,
      quantity: item.quantity,
    }));

    res.json(items);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
