const express = require('express');
const router = express.Router();
const pool = require('../db/connection');
const logger = require('../db/logger');

// Отримати всі записи `Enrollments`
router.get('/enrollments', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT s.name AS student_name, c.name AS course_name, e.grade
            FROM enrollments e
            JOIN students s ON e.student_id = s.id
            JOIN courses c ON e.course_id = c.id;
        `);

        logger.info(`Записи студентів у курсах: ${JSON.stringify(result.rows)}`);
        res.json(result.rows);
    } catch (error) {
        logger.error(`Помилка отримання записів: ${error.message}`);
        res.status(500).json({ error: 'Помилка отримання записів' });
    }
});

// Додати запис `Enrollments`
router.post('/enrollments', async (req, res) => {
    try {
        const { student_id, course_id, grade } = req.body;
        if (!student_id || !course_id || grade === undefined) {
            return res.status(400).json({ error: 'Необхідно вказати student_id, course_id та grade' });
        }

        const result = await pool.query(
            'INSERT INTO enrollments (student_id, course_id, grade) VALUES ($1, $2, $3) RETURNING *',
            [student_id, course_id, grade]
        );

        logger.info(`Студент записаний на курс: ${JSON.stringify(result.rows[0])}`);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        logger.error(`Помилка запису студента: ${error.message}`);
        res.status(500).json({ error: 'Помилка запису студента' });
    }
});

module.exports = router;
