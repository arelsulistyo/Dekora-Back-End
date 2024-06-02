const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const flowerSchema = new Schema({
  name: { type: String, required: true },
  imageUrl: { type: String, required: true },
  type: { type: String, required: true },
  size: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
}, {
  timestamps: true,
});

const Flower = mongoose.model('Flower', flowerSchema);

module.exports = Flower;
