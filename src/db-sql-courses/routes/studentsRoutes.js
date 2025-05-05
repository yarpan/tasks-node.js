const express = require('express');
const router = express.Router();
const logger = require('../db/logger');
const Student = require('../models/studentModel');

router.get('/students', async (req, res) => {
    try {
        const students = await Student.getAll();
        logger.info(`Отримано список студентів: ${JSON.stringify(students)}`);
        res.json(students);
    } catch (error) {
        logger.error(`Помилка отримання студентів: ${error.message}`);
        res.status(500).json({ error: 'Помилка отримання студентів' });
    }
});

router.get('/students/avg', async (req, res) => {
    try {
        const students = await Student.getAllWithAvgGrade();
        logger.info(`Середні оцінки студентів: ${JSON.stringify(students)}`);
        res.json(students);
    } catch (error) {
        logger.error(`Помилка отримання середніх оцінок студентів: ${error.message}`);
        res.status(500).json({ error: 'Помилка отримання середніх оцінок студентів' });
    }
});

router.get('/students/top', async (req, res) => {
    try {
        const topStudent = await Student.getTopStudent();
        logger.info(`Топ-студент: ${JSON.stringify(topStudent)}`);
        res.json(topStudent);
    } catch (error) {
        logger.error(`Помилка отримання топ-студента: ${error.message}`);
        res.status(500).json({ error: 'Помилка отримання топ-студента' });
    }
});

router.post('/students', async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ error: 'Необхідно вказати ім’я студента' });
        }

        const result = await pool.query(
            'INSERT INTO students (name) VALUES ($1) RETURNING *',
            [name]
        );

        logger.info(`Студент доданий: ${JSON.stringify(result.rows[0])}`);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        logger.error(`Помилка додавання студента: ${error.message}`);
        res.status(500).json({ error: 'Помилка додавання студента' });
    }
});


module.exports = router;