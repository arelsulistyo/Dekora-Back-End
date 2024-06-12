const Flower = require("../models/flower.model");

exports.getFlowers = async (req, res) => {
  try {
    const flowers = await Flower.find();
    res.status(200).json(flowers);
  } catch (error) {
    res.status(500).json({ message: "Failed to get flowers", error });
  }
};

exports.reduceStock = async (flowerId, quantity, session) => {
  const flower = await Flower.findById(flowerId).session(session);
  if (!flower) {
    throw new Error(`Flower with ID ${flowerId} not found`);
  }
  if (flower.stock < quantity) {
    throw new Error(`Not enough stock for flower: ${flower.name}`);
  }
  flower.stock -= quantity;
  await flower.save({ session });
};
