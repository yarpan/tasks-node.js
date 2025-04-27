const express = require('express');
const router = express.Router();
const { addGuest, getGuestById, getAllGuests } = require('../controllers/guestsController'); // Import the new controller

// Route to add a new guest
router.post('/', addGuest);

// Route to get guest details by ID
router.get('/:guest_id', getGuestById);

// Route to get all guests with filters and pagination
router.get('/', getAllGuests);

module.exports = router;
