const pool = require('../db/connection');

const Course = {
    // Отримати всі курси
    getAll: async () => {
        const result = await pool.query('SELECT * FROM courses');
        return result.rows;
    },

    // Отримати кількість студентів у кожному курсі
    getStudentCountByCourse: async () => {
        const result = await pool.query(`
            SELECT c.name, COUNT(e.student_id) AS student_count
            FROM courses c
            LEFT JOIN enrollments e ON c.id = e.course_id
            GROUP BY c.name;
        `);
        return result.rows;
    },

    // Отримати курси, де середня оцінка > minGrade
    getHighRatedCourses: async (minGrade) => {
        const result = await pool.query(`
            SELECT c.name
            FROM courses c
            JOIN enrollments e ON c.id = e.course_id
            GROUP BY c.name
            HAVING AVG(e.grade) > $1;
        `, [minGrade]); // Передаємо параметр
        return result.rows;
    }
};

module.exports = Course;
