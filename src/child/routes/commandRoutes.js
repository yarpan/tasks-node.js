const express = require('express');
const router = express.Router();
const commandController = require('../controllers/commandController');

router.get('/execute', commandController.executeCommand);

module.exports = router;
