

const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Масив продуктів
const products = [
    { name: "Яблука", inStock: true },
    { name: "Банани", inStock: false },
    { name: "Апельсини", inStock: true },
    { name: "Ківі", inStock: false },
    { name: "Мандарини", inStock: true },
    { name: "Фініки", inStock: true },
    { name: "Грейпфрукти", inStock: false },
    { name: "Виноград", inStock: false },
];

// Налаштування шаблонного двигуна
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Роут для відображення списку продуктів
app.get('/', (req, res) => {
    res.render('products', { products });
});

// Запуск сервера
app.listen(port, () => {
    console.log(`Сервер запущено на http://localhost:${port}`);
});

