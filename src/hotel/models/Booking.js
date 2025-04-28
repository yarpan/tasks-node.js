const pool = require('../db/db');

class Booking {
    static async create(guest_id, room_id, check_in, check_out, total_price) {
        const result = await pool.query(
            'INSERT INTO bookings (guest_id, room_id, check_in, check_out, total_price) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [guest_id, room_id, check_in, check_out, total_price]
        );
        return result.rows[0];
    }

    static async calculateRevenue(year, month) {
        const result = await pool.query(
            `SELECT SUM(total_price) AS revenue 
             FROM bookings 
             WHERE EXTRACT(YEAR FROM check_in) = $1 
             AND EXTRACT(MONTH FROM check_in) = $2`,
            [year, month]
        );
        return result.rows[0].revenue || 0;
    }

    static async getBookingHistoryByRoomId(room_id) {
        const result = await pool.query(
            `SELECT * FROM bookings WHERE room_id = $1 ORDER BY check_in DESC`,
            [room_id]
        );
        return result.rows;
    }
}

module.exports = Booking;
