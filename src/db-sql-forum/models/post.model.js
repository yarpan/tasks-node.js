const pool = require('../config/db');

// CREATE
const createPost = async ({ title, content, authorId }) => {
  const result = await pool.query(
    `INSERT INTO posts (title, content, author_id) VALUES ($1, $2, $3) RETURNING *`,
    [title, content, authorId]
  );
  return result.rows[0];
};

// READ
const getAllPosts = async () => {
  const result = await pool.query(`
    SELECT posts.*, users.username AS author 
    FROM posts
    JOIN users ON posts.author_id = users.id
    ORDER BY posts.created_at DESC
  `);
  return result.rows;
};

const getPostById = async (id) => {
  const result = await pool.query('SELECT * FROM posts WHERE id = $1', [id]);
  return result.rows[0];
};

// UPDATE
const updatePost = async (id, { title, content }) => {
  const result = await pool.query(
    `UPDATE posts SET title = $1, content = $2 WHERE id = $3 RETURNING *`,
    [title, content, id]
  );
  return result.rows[0];
};

// DELETE
const deletePost = async (id) => {
  await pool.query('DELETE FROM posts WHERE id = $1', [id]);
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
};
