const mongoose = require("mongoose");
const { Schema } = mongoose;

const flowerSchema = new Schema({
  name: { type: String, required: true },
  imageUrl: { type: String, required: true },
  type: { type: String, required: true },
  price: { type: Number, required: true },
  size: { type: String, required: true },
  description: { type: String, required: true },
  stock: { type: Number, required: true },
});

module.exports = mongoose.model("Flower", flowerSchema);
