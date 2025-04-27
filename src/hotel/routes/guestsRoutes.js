const express = require('express');
const router = express.Router();
const { addGuest } = require('../controllers/guestsController');

router.post('/', addGuest);

module.exports = router;
