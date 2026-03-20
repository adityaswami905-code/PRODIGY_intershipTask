const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: String,

  items: [
    {
      productId: String,
      name: String,
      price: Number,
      qty: Number,
    },
  ],

  totalPrice: Number,

  status: {
    type: String,
    default: "Processing",
  },
  createdAt: {
     type: Date, default: Date.now 
    },

}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);