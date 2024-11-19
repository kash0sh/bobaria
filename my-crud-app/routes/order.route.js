const express = require("express");
const router = express.Router();
const { createOrder, getOrders, getOrder, deleteAllOrders, updateOrderStatus, deleteOrder } = require("../controllers/order.controller.js");

router.post("/", createOrder); // Create an order
router.get("/", getOrders); // Get all orders
router.get("/:id", getOrder); // Get a specific order by ID
router.delete('/', deleteAllOrders);
router.put('/:id', updateOrderStatus);
router.delete('/:id', deleteOrder);

module.exports = router;
