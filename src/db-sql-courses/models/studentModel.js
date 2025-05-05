const pool = require('../db/connection');

const Student = {
    getAll: async () => {
        const result = await pool.query('SELECT * FROM students');
        return result.rows;
    },
    getById: async (id) => {
        const result = await pool.query('SELECT * FROM students WHERE id = $1', [id]);
        return result.rows[0];
    },
    
};

module.exports = Student;
