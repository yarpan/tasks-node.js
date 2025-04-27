const Guest = require('../models/Guest');

const addGuest = async (req, res) => {
    const { first_name, last_name, email, phone, address } = req.body;
    if (!first_name || !last_name || !email) {
        return res.status(400).json({ error: "Missing required fields: first_name, last_name, or email." });
    }
    try {
        const guest = await Guest.create(first_name, last_name, email, phone, address);
        res.status(201).json(guest);
    } catch (err) {
        console.error('Error while adding guest:', err.message);
        res.status(500).json({ error: 'Failed to add guest', details: err.message });
    }
};

const getGuestById = async (req, res) => {
    const { guest_id } = req.params;
    try {
        const guest = await Guest.getById(guest_id);
        if (!guest) {
            return res.status(404).json({ error: 'Guest not found' });
        }
        res.status(200).json(guest);
    } catch (err) {
        console.error(`Error while retrieving guest with ID ${guest_id}:`, err.message);
        res.status(500).json({ error: 'Failed to retrieve guest details', details: err.message });
    }
};

const getAllGuests = async (req, res) => {
    const { id, first_name, last_name, email, limit = 10, offset = 0 } = req.query;
    try {
        const filters = { id, first_name, last_name, email };
        const guests = await Guest.getAll(filters, limit, offset);
        res.status(200).json(guests);
    } catch (err) {
        console.error('Error while retrieving all guests:', err.message);
        res.status(500).json({ error: 'Failed to retrieve guests', details: err.message });
    }
};

module.exports = { addGuest, getGuestById, getAllGuests };
