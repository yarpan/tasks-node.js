const express = require('express');
const { registerUser, loginUser, getAllUsers } = require('../controllers/authController');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/users', authenticateToken, getAllUsers); // Protected route

module.exports = router;
