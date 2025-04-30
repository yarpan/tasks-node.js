const Booking = require('../models/Booking');

const getAvailableRooms = async (req, res) => {
    const { date } = req.query;
    try {
        const rooms = await Room.getAvailable(date);
        res.json(rooms);
    } catch (err) {
        console.error('Error while fetching available rooms:', err.message);
        res.status(500).json({ error: 'Failed to fetch available rooms', details: err.message });
    }
};

const getRoomBookingHistory = async (req, res) => {
    const { room_id } = req.params;
    try {
        const bookings = await Booking.getBookingHistoryByRoomId(room_id);
        res.status(200).json(bookings);
    } catch (err) {
        console.error(`Error while fetching booking history for room ${room_id}:`, err.message);
        res.status(500).json({ error: 'Failed to fetch booking history', details: err.message });
    }
};

module.exports = { getAvailableRooms, getRoomBookingHistory };
