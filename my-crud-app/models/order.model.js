const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema(
  {
    customerDetails: {
      firstName: String,
      lastName: String,
      address: String,
      postalCode: String,
      city: String,
      state: String,
      email: String,
      phone: String,
    },
    cartItems: [
      {
        name: String,
        quantity: Number,
        price: Number,
      },
    ],
    totalPrice: Number,
    status: {
      type: String,
      default: "Pending", // Can be 'Pending', 'Processing', 'Shipped', etc.
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
