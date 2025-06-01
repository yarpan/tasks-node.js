const express = require('express');
const router = express.Router();

const {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} = require('../controllers/post.controller');

const { authenticateToken } = require('../middleware/auth.middleware');

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Операції з постами
 */

/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: Отримати всі пости (з підтримкою фільтрації та пагінації)
 *     tags: [Posts]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Номер сторінки
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Кількість на сторінку
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Пошук за назвою або контентом
 *     responses:
 *       200:
 *         description: Список постів
 */
router.get('/', getAllPosts);

/**
 * @swagger
 * /api/posts/{id}:
 *   get:
 *     summary: Отримати пост за ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID поста
 *     responses:
 *       200:
 *         description: Знайдений пост
 *       404:
 *         description: Пост не знайдено
 */
router.get('/:id', getPostById);

/**
 * @swagger
 * /api/posts:
 *   post:
 *     summary: Створити новий пост
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *                 example: Мій перший пост
 *               content:
 *                 type: string
 *                 example: Це текст мого першого поста
 *     responses:
 *       201:
 *         description: Пост створено
 *       401:
 *         description: Неавторизований
 */
router.post('/', authenticateToken, createPost);

/**
 * @swagger
 * /api/posts/{id}:
 *   put:
 *     summary: Оновити пост за ID
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID поста
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Оновлений заголовок
 *               content:
 *                 type: string
 *                 example: Оновлений текст поста
 *     responses:
 *       200:
 *         description: Пост оновлено
 *       401:
 *         description: Неавторизований
 *       403:
 *         description: Доступ заборонено
 */
router.put('/:id', authenticateToken, updatePost);

/**
 * @swagger
 * /api/posts/{id}:
 *   delete:
 *     summary: Видалити пост за ID
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID поста
 *     responses:
 *       200:
 *         description: Пост видалено
 *       401:
 *         description: Неавторизований
 *       403:
 *         description: Доступ заборонено
 */
router.delete('/:id', authenticateToken, deletePost);

module.exports = router;
