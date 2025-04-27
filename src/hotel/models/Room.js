const pool = require('../db/db');

class Room {
    static async getAvailable(date) {
        const result = await pool.query(
            `SELECT * FROM rooms WHERE room_id NOT IN 
             (SELECT room_id FROM bookings WHERE $1 BETWEEN check_in AND check_out)`,
            [date]
        );
        return result.rows;
    }
}

module.exports = Room;
