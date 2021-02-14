const express = require("express");
// eslint-disable-next-line new-cap
const orderApi = express.Router();
const {db} = require("../util/admin");
const {isAuth} = require("../util/auth");
// Create a product with Auto ID

orderApi.post("/", isAuth, (req, res) => {
  if (req.body.orderItems.length === 0) {
    res.status(400).json({message: "El carrito esta vacio"});
  } else {
    const {shippingAddress, orderItems, itemsPrice, shippingPrice, taxPrice, totalPrice} = req.body;
    const newOrder = {
      shippingAddress, orderItems, itemsPrice, shippingPrice, taxPrice, totalPrice,
      user: req.user._id,
      camilo: 'test'
    };
    res.status(201).json(newOrder);
  }
});

module.exports = orderApi;
