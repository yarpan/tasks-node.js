const pool = require('../config/db');

const getAllUsers = async () => {
  const result = await pool.query('SELECT id, username, email, role FROM users');
  return result.rows;
};

const getUserById = async (id) => {
  const result = await pool.query('SELECT id, username, email, role FROM users WHERE id = $1', [id]);
  return result.rows[0];
};

const updateUser = async (id, { username, email, password }) => {
  const fields = [];
  const values = [];
  let index = 1;

  if (username) {
    fields.push(`username = $${index++}`);
    values.push(username);
  }

  if (email) {
    fields.push(`email = $${index++}`);
    values.push(email);
  }

  if (password) {
    fields.push(`password = $${index++}`);
    values.push(password);
  }

  values.push(id); // last param is WHERE id = $n

  const result = await pool.query(
    `UPDATE users SET ${fields.join(', ')} WHERE id = $${index} RETURNING id, username, email, role`,
    values
  );

  return result.rows[0];
};

const deleteUser = async (id) => {
  await pool.query('DELETE FROM users WHERE id = $1', [id]);
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
};

