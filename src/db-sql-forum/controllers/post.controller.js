const postModel = require('../models/post.model');

// GET all posts
const getAllPosts = async (req, res) => {
  try {
    const posts = await postModel.getAllPosts();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching posts' });
  }
};

// GET one post
const getPostById = async (req, res) => {
  try {
    const post = await postModel.getPostById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching post' });
  }
};

// CREATE
const createPost = async (req, res) => {
  const { title, content } = req.body;
  const authorId = req.user.id;

  try {
    const post = await postModel.createPost({ title, content, authorId });
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: 'Error creating post' });
  }
};

// UPDATE
const updatePost = async (req, res) => {
  const { id } = req.params;
  const currentUser = req.user;
  try {
    const existingPost = await postModel.getPostById(id);
    if (!existingPost) return res.status(404).json({ message: 'Post not found' });

    if (currentUser.role !== 'admin' && existingPost.author_id !== currentUser.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const updated = await postModel.updatePost(id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error updating post' });
  }
};

// DELETE
const deletePost = async (req, res) => {
  const { id } = req.params;
  const currentUser = req.user;
  try {
    const post = await postModel.getPostById(id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    if (currentUser.role !== 'admin' && post.author_id !== currentUser.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    await postModel.deletePost(id);
    res.json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting post' });
  }
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
