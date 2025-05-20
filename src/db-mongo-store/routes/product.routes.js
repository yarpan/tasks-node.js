const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/product.controller');

router.get('/category/:categoryName', ProductController.getProductsByCategory);

router.get('/top/sales', ProductController.getTopProductsBySales);

router.post('/', ProductController.createProduct);

module.exports = router;
