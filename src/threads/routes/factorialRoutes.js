const express = require('express');
const router = express.Router();
const factorialController = require('../controllers/factorialController');

router.get('/factorial', factorialController.calculateFactorial);

module.exports = router;
