const Order = require("../models/Order");

//  Place Order
const placeOrder = async (req, res) => {
  const { items, totalPrice } = req.body;

  const order = await Order.create({
    userId: req.user,
    items,
    totalPrice,
  });

  res.json(order);
};

//  Get user orders
const getOrders = async (req, res) => {
  const orders = await Order.find({ userId: req.user });
  res.json(orders);
};

module.exports = { placeOrder, getOrders };