const Flower = require('../models/flower.model');

exports.getFlowers = async (req, res) => {
  try {
    const flowers = await Flower.find();
    res.status(200).json(flowers);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get flowers', error });
  }
};
