const express = require('express');
const { getStudents, addStudent, updateStudentAge, deleteStudent, filterStudents } = require('../controllers/studentController');

const router = express.Router();

router.get('/', getStudents);
router.post('/', addStudent);
router.put('/:id', updateStudentAge);
router.delete('/:group', deleteStudent);
router.get('/filter', filterStudents);

module.exports = router;
