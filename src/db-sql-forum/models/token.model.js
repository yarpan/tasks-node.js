const pool = require('../config/db');

const saveToken = async (userId, token) => {
  await pool.query(
    'INSERT INTO tokens (user_id, token) VALUES ($1, $2)',
    [userId, token]
  );
};

const removeToken = async (token) => {
  await pool.query('DELETE FROM tokens WHERE token = $1', [token]);
};

const findToken = async (token) => {
  const result = await pool.query('SELECT * FROM tokens WHERE token = $1', [token]);
  return result.rows[0];
};

module.exports = {
  saveToken,
  removeToken,
  findToken,
};
