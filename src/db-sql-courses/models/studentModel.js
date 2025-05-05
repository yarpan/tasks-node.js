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

    getAllWithAvgGrade: async () => {
        const result = await pool.query(`
            SELECT s.id, s.name, COALESCE(AVG(e.grade), 0) AS avg_grade
            FROM students s
            LEFT JOIN enrollments e ON s.id = e.student_id
            GROUP BY s.id, s.name;
        `);
        return result.rows;
    },

    getStudentsByCourse: async (courseName) => {
        const result = await pool.query(`
            SELECT s.id, s.name
            FROM students s
            JOIN enrollments e ON s.id = e.student_id
            JOIN courses c ON e.course_id = c.id
            WHERE c.name = $1;
        `, [courseName]);
        return result.rows;
    },

    getTopStudent: async () => {
        const result = await pool.query(`
            SELECT s.id, s.name, COALESCE(AVG(e.grade), 0) AS avg_grade
            FROM students s
            LEFT JOIN enrollments e ON s.id = e.student_id
            GROUP BY s.id, s.name
            ORDER BY avg_grade DESC
            LIMIT 1;
        `);
        return result.rows[0];
    }
};

module.exports = Student;
