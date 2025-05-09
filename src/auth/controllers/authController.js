const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const users = []; // Тимчасове сховище користувачів (замість БД)

const register = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Необхідно вказати email і password' });
    }

    // Хешуємо пароль
    const hashedPassword = await bcrypt.hash(password, 10);

    // Додаємо користувача
    users.push({ email, password: hashedPassword });

    res.status(201).json({ message: 'Користувач зареєстрований' });
};


const login = async (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);
    if (!user) {
        return res.status(401).json({ error: 'Неправильний email або пароль' });
    }

    // Перевіряємо пароль
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        return res.status(401).json({ error: 'Неправильний email або пароль' });
    }

    // Генеруємо JWT
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
};


const profile = (req, res) => {
    res.json({ message: `Привіт, ${req.user.email}! Це твій профіль.` });
};

module.exports = { register, login, profile };
