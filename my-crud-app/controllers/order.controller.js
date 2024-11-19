const Order = require('../models/order.model.js');

const createOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteAllOrders = async (req, res) => {
    try {
      await Order.deleteMany({});  // Delete all orders
      res.status(200).json({ message: "All orders have been deleted." });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const deleteOrder = async (req,res) => {
    try {
        const { id } = req.params;
        const order = await Order.findByIdAndDelete(id);
        if (!order) {
            return res.status(400).json({message: "Order not found"})
        }
        res.status(200).json({message: 'Order deleted successfully! '})

    
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

  const updateOrderStatus = async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
  
      const order = await Order.findById(id);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
  
      order.status = status;
      await order.save();
  
      res.status(200).json(order); // Return the updated order
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

module.exports = {
  createOrder,
  getOrders,
  getOrder,
  deleteAllOrders,
  updateOrderStatus,
  deleteOrder
};
