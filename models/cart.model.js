const mongoose = require("mongoose");
const { Schema } = mongoose;

const cartSchema = new Schema({
  userId: { type: String, required: true },
  flowerId: { type: Schema.Types.ObjectId, ref: "Flower", required: true },
  quantity: { type: Number, required: true },
});

module.exports = mongoose.model("Cart", cartSchema);
