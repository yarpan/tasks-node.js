const express = require('express');
const router = express.Router();
const { getAvailableRooms, getRoomBookingHistory } = require('../controllers/roomsController');

// Route to get available rooms
router.get('/available', getAvailableRooms);

// Route to get room booking history by room ID
router.get('/getRoomBookings/:room_id', getRoomBookingHistory);

module.exports = router;

