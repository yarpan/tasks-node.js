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

// Public routes
router.get('/', getAllPosts);
router.get('/:id', getPostById);

// Protected
router.post('/', authenticateToken, createPost);
router.put('/:id', authenticateToken, updatePost);
router.delete('/:id', authenticateToken, deletePost);

module.exports = router;
