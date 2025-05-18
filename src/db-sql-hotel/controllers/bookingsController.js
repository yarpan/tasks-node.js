const Booking = require('../models/Booking');

const createBooking = async (req, res) => {
    const { guest_id, room_id, check_in, check_out, total_price } = req.body;
    try {
        const booking = await Booking.create(guest_id, room_id, check_in, check_out, total_price);
        res.status(201).json(booking);
    } catch (err) {
        console.error('Error while creating booking:', err.message);
        res.status(500).json({ error: 'Failed to create booking', details: err.message });
    }
};

const calculateRevenue = async (req, res) => {
    const { year, month } = req.query;
    try {
        const revenue = await Booking.calculateRevenue(year, month);
        res.status(200).json({ revenue });
    } catch (err) {
        console.error('Error while calculating revenue:', err.message);
        res.status(500).json({ error: 'Failed to calculate revenue', details: err.message });
    }
};

module.exports = { createBooking, calculateRevenue };
