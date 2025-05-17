const jwt = require('jsonwebtoken');
const { hashPassword, comparePassword } = require('../utils/hashHelper');
const User = require('../models/User');

const registerUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (await User.findOne({ where: { email } })) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await hashPassword(password);
        await User.create({ email, password: hashedPassword });

        res.status(201).json({ message: 'User successfully registered' });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user || !(await comparePassword(password, user.password))) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // last login refresh
        user.lastLogin = new Date();
        await user.save();

        const token = jwt.sign({ email: user.email }, process.env.SECRET_KEY, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


const getProfile = async (req, res) => {
    try {
        const user = await User.findOne({ where: { email: req.user.email } });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({
            email: user.email,
            registeredAt: user.createdAt, // register time
            lastLogin: user.lastLogin || 'Never logged in' // last login time
        });
    } catch (error) {
        console.error('Profile error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({ attributes: ['id', 'email', 'createdAt', 'lastLogin'] });
        res.json({ users });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { registerUser, loginUser, getProfile, getAllUsers }