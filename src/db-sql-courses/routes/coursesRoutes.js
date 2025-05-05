const express = require('express');
const router = express.Router();
const logger = require('../db/logger');
const Course = require('../models/courseModel');

router.get('/courses', async (req, res) => {
    try {
        const courses = await Course.getAll();
        logger.info(`Отримано список курсів: ${JSON.stringify(courses)}`);
        res.json(courses);
    } catch (error) {
        logger.error(`Помилка отримання курсів: ${error.message}`);
        res.status(500).json({ error: 'Помилка отримання курсів' });
    }
});

router.get('/courses/count', async (req, res) => {
    try {
        const courses = await Course.getStudentCountByCourse();
        logger.info(`Кількість студентів у курсах: ${JSON.stringify(courses)}`);
        res.json(courses);
    } catch (error) {
        logger.error(`Помилка отримання кількості студентів у курсах: ${error.message}`);
        res.status(500).json({ error: 'Помилка отримання кількості студентів у курсах' });
    }
});

router.get('/courses/high-rated/:minGrade', async (req, res) => {
    try {
        const minGrade = parseFloat(req.params.minGrade);
        if (isNaN(minGrade)) {
            logger.warn(`Некоректне значення балу: ${req.params.minGrade}`);
            return res.status(400).json({ error: 'Некоректне значення балу' });
        }

        const courses = await Course.getHighRatedCourses(minGrade);
        logger.info(`Запит курсів з балом > ${minGrade}: ${JSON.stringify(courses)}`);
        res.json(courses);
    } catch (error) {
        logger.error(`Помилка отримання курсів з високими оцінками: ${error.message}`);
        res.status(500).json({ error: 'Помилка отримання курсів з високими оцінками' });
    }
});

router.post('/courses', async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ error: 'Необхідно вказати назву курсу' });
        }

        const result = await pool.query(
            'INSERT INTO courses (name) VALUES ($1) RETURNING *',
            [name]
        );

        logger.info(`Курс доданий: ${JSON.stringify(result.rows[0])}`);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        logger.error(`Помилка додавання курсу: ${error.message}`);
        res.status(500).json({ error: 'Помилка додавання курсу' });
    }
});

module.exports = router;