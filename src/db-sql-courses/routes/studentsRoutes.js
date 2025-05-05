const express = require('express');
const studentsController = require('../controllers/studentsController');

const router = express.Router();

router.get('/students', studentsController.getAllStudents);

module.exports = router;
