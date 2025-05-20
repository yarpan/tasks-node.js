const Product = require('../models/product.model');
const Category = require('../models/category.model');

exports.getProductsByCategory = async (req, res) => {
  try {
    const { categoryName } = req.params;

    const category = await Category.findOne({ name: categoryName });
    if (!category) return res.status(404).json({ message: 'Category not found' });

    const products = await Product.find({ category: category._id });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getTopProductsBySales = async (req, res) => {
  try {
    const topProducts = await Product.find().sort({ salesCount: -1 }).limit(3);
    res.json(topProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    return res.status(201).json(newProduct);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
