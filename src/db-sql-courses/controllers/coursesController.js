const Course = require('../models/courseModel');

const coursesController = {
    getAllCourses: async (req, res) => {
        try {
            const courses = await Course.getAll();
            res.json(courses);
        } catch (error) {
            res.status(500).json({ error: 'Помилка отримання курсів' });
        }
    }
};

module.exports = coursesController;
