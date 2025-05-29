require('dotenv').config();
const mongoose = require('mongoose');
const Category = require('./models/category.model');
const Product = require('./models/product.model');
const Order = require('./models/order.model');

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Підключено до MongoDB');

    // Очистка бази (опціонально)
    await Category.deleteMany({});
    await Product.deleteMany({});
    await Order.deleteMany({});

    // Створення категорій
    const smartphonesCategory = new Category({ name: "Smartphones" });
    const laptopsCategory = new Category({ name: "Laptops" });
    const accessoriesCategory = new Category({ name: "Accessories" });
    await smartphonesCategory.save();
    await laptopsCategory.save();
    await accessoriesCategory.save();

    // Створення продуктів
    const product1 = new Product({
      name: "iPhone 13",
      price: 899,
      category: smartphonesCategory._id,
      stock: 25,
      salesCount: 0
    });
    const product2 = new Product({
      name: "Samsung Galaxy S21",
      price: 799,
      category: smartphonesCategory._id,
      stock: 30,
      salesCount: 0
    });
    const product3 = new Product({
      name: "Dell XPS 15",
      price: 1299,
      category: laptopsCategory._id,
      stock: 10,
      salesCount: 0
    });
    const product4 = new Product({
      name: "Logitech Mouse",
      price: 49,
      category: accessoriesCategory._id,
      stock: 100,
      salesCount: 0
    });
    await product1.save();
    await product2.save();
    await product3.save();
    await product4.save();

    // Створення замовлень
    const order1 = new Order({
      products: [
        { product: product1._id, quantity: 2, price: product1.price },
        { product: product2._id, quantity: 1, price: product2.price }
      ],
      total: product1.price * 2 + product2.price * 1,
      orderDate: new Date()
    });
    const order2 = new Order({
      products: [
        { product: product3._id, quantity: 1, price: product3.price },
        { product: product4._id, quantity: 3, price: product4.price }
      ],
      total: product3.price + product4.price * 3,
      orderDate: new Date()
    });
    await order1.save();
    await order2.save();

    console.log('Filling database with test records completed successfully.');
  } catch (error) {
    console.error('Error filling database:', error);
  } finally {
    await mongoose.connection.close();
  }
}

seed();
