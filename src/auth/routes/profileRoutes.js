const express = require('express');
const authenticateToken = require('../middleware/authMiddleware');
const { getProfile } = require('../controllers/authController');

const router = express.Router();

router.get('/', authenticateToken, getProfile);

module.exports = router;
