const pool = require('../db/connection');

const Course = {
    getAll: async () => {
        const result = await pool.query('SELECT * FROM courses');
        return result.rows;
    },
};

module.exports = Course;
