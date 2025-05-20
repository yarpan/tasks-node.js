const Order = require('../models/order.model');
const Product = require('../models/product.model');


exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('products.product');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getTotalProfit = async (req, res) => {
  try {
    const result = await Order.aggregate([
      { $group: { _id: null, totalProfit: { $sum: "$total" } } }
    ]);
    const totalProfit = result.length > 0 ? result[0].totalProfit : 0;
    return res.json({ totalProfit });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


exports.createOrder = async (req, res) => {
  try {
    const orderData = req.body; // [{ product, quantity, price }, ...]
    
    for (const item of orderData.products) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: -item.quantity, salesCount: item.quantity }
      });
    }
    
    const newOrder = new Order(orderData);
    await newOrder.save();
    return res.status(201).json(newOrder);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
