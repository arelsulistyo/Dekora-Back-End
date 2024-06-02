const Flower = require('../models/flower.model');

const getFlowers = async (req, res) => {
  try {
    const flowers = await Flower.find();
    res.json(flowers);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
};

const addFlower = async (req, res) => {
  const { name, imageUrl, type, size, price, description } = req.body;

  const newFlower = new Flower({ name, imageUrl, type, size, price, description });

  try {
    await newFlower.save();
    res.json('Flower added!');
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
};

module.exports = {
  getFlowers,
  addFlower,
};
