const express = require('express');
const router = express.Router();
const { createBooking, calculateRevenue  } = require('../controllers/bookingsController');

router.post('/', createBooking);
router.get('/revenue', calculateRevenue);

module.exports = router;
