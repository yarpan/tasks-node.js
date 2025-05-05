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

module.exports = router;