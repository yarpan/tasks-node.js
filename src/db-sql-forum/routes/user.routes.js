const express = require('express');
const router = express.Router();


const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require('../controllers/user.controller');

const { authenticateToken, authorizeRole } = require('../middleware/auth.middleware');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Операції з користувачами
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Отримати всіх користувачів (тільки для admin)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Список користувачів
 *       403:
 *         description: Доступ заборонено
 */
router.get('/', authenticateToken, authorizeRole(['admin']), getAllUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Отримати користувача за ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID користувача
 *     responses:
 *       200:
 *         description: Дані користувача
 *       403:
 *         description: Доступ заборонено
 */
router.get('/:id', authenticateToken, getUserById);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Оновити дані користувача
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID користувача
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: newusername
 *               password:
 *                 type: string
 *                 example: newpassword
 *     responses:
 *       200:
 *         description: Користувача оновлено
 *       403:
 *         description: Доступ заборонено
 */
router.put('/:id', authenticateToken, updateUser);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Видалити користувача (тільки для admin)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID користувача
 *     responses:
 *       200:
 *         description: Користувача видалено
 *       403:
 *         description: Доступ заборонено
 */
router.delete('/:id', authenticateToken, authorizeRole(['admin']), deleteUser);

module.exports = router;
