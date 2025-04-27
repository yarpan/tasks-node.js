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

module.exports = { addGuest };

