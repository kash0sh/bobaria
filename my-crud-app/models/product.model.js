const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter product name"],
    },

    price: {
      type: Number,
      required: [true, "Please enter product price"],
    },

    image: {
      type: String,
      required: false, // Image is not required, so keeping it optional
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
