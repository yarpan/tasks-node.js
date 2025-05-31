const express = require('express');
const router = express.Router();

const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require('../controllers/user.controller');

const { authenticateToken, authorizeRole } = require('../middleware/auth.middleware');

router.get('/', authenticateToken, authorizeRole(['admin']), getAllUsers);

router.get('/:id', authenticateToken, getUserById);

router.put('/:id', authenticateToken, updateUser);

router.delete('/:id', authenticateToken, authorizeRole(['admin']), deleteUser);

module.exports = router;
