const mongoose = require("mongoose");
const Flower = require("../models/flower.model");
require("dotenv").config();

const uri = process.env.MONGO_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const flowers = [
  {
    name: "Dahlia",
    imageUrl: "assets/images/flower1.png",
    type: "Indoor",
    price: 10000,
    size: "Medium",
    description:
      'Chrysanthemums, or simply "mums," are vibrant flowers with diverse colors and shapes. They symbolize happiness and longevity in many cultures and are commonly used in celebrations like weddings and festivals. Mums are easy to grow in sunny spots and well-drained soil, making them perfect for gardens or containers.',
    stock: 999,
  },
  {
    name: "Roses",
    imageUrl: "assets/images/flower2.png",
    type: "Outdoor",
    price: 1000,
    size: "Small",
    description:
      "Roses are a symbol of love and romance. They come in a variety of colors and sizes and are perfect for gardens and bouquets.",
    stock: 500,
  },
  {
    name: "Tulip",
    imageUrl: "assets/images/flower3.png",
    price: 20000,
    type: "Outdoor",
    size: "Small",
    description:
      "Tulips are a symbol of spring and rebirth. They come in a variety of colors and sizes and are perfect for gardens and bouquets.",
    stock: 300,
  },
  // Add more flowers as needed
];

const populateFlowers = async () => {
  try {
    await Flower.deleteMany();
    await Flower.insertMany(flowers);
    console.log("Dummy flowers added!");
    mongoose.connection.close();
  } catch (err) {
    console.error(err);
    mongoose.connection.close();
  }
};

populateFlowers();
