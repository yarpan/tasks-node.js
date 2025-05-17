const Student = require('../models/studentModel');

const studentsController = {
    getAllStudents: async (req, res) => {
        try {
            const students = await Student.getAll();
            res.json(students);
        } catch (error) {
            res.status(500).json({ error: 'Помилка отримання студентів' });
        }
    }
};

module.exports = studentsController;
