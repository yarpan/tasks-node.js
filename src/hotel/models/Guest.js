const pool = require('../db/db');

class Guest {
    static async create(first_name, last_name, email, phone, address) {
        const result = await pool.query(
            'INSERT INTO guests (first_name, last_name, email, phone, address) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [first_name, last_name, email, phone, address]
        );
        return result.rows[0];
    }

    static async getById(guest_id) {
        const result = await pool.query(
            'SELECT * FROM guests WHERE guest_id = $1',
            [guest_id]
        );
        return result.rows[0];
    }

    static async getAll(filters, limit, offset) {
        const query = [];
        const values = [];

        // Dynamically build the WHERE clause based on provided filters
        if (filters.id) {
            query.push('guest_id = $' + (values.length + 1));
            values.push(filters.id);
        }
        if (filters.first_name) {
            query.push('first_name ILIKE $' + (values.length + 1));
            values.push(`%${filters.first_name}%`);
        }
        if (filters.last_name) {
            query.push('last_name ILIKE $' + (values.length + 1));
            values.push(`%${filters.last_name}%`);
        }
        if (filters.email) {
            query.push('email ILIKE $' + (values.length + 1));
            values.push(`%${filters.email}%`);
        }

        const whereClause = query.length > 0 ? 'WHERE ' + query.join(' AND ') : '';
        const finalQuery = `
            SELECT * FROM guests 
            ${whereClause}
            LIMIT $${values.length + 1} OFFSET $${values.length + 2}
        `;

        values.push(limit, offset);

        const result = await pool.query(finalQuery, values);
        return result.rows;
    }
}

module.exports = Guest;
