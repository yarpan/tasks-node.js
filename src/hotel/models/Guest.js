const pool = require('../db/db');

class Guest {
    static async create(first_name, last_name, email, phone, address) {
        const result = await pool.query(
            'INSERT INTO guests (first_name, last_name, email, phone, address) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [first_name, last_name, email, phone, address]
        );
        return result.rows[0];
    }
}

module.exports = Guest;
