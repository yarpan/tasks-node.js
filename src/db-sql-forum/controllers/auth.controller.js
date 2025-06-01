const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const pool = require('../config/db');
const tokenModel = require('../models/token.model');

const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user.id, role: user.role },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '15m' }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user.id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '7d' }
  );
};

// -----------------------------

const register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const existing = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (existing.rows.length > 0) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await pool.query(
      'INSERT INTO users (username, password, role) VALUES ($1, $2, $3) RETURNING *',
      [username, hashedPassword, 'user']
    );

    res.status(201).json({ message: 'User created', user: newUser.rows[0] });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed' });
  }
};

// -----------------------------

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const userResult = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    const user = userResult.rows[0];
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    await tokenModel.saveToken(user.id, refreshToken);

    res.json({ accessToken, refreshToken });
  } catch (err) {
    res.status(500).json({ message: 'Login failed' });
  }
};

// -----------------------------

const refresh = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.sendStatus(401);

  try {
    const stored = await tokenModel.findToken(refreshToken);
    if (!stored) return res.sendStatus(403);

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, userData) => {
      if (err) return res.sendStatus(403);
      const accessToken = jwt.sign(
        { id: userData.id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' }
      );
      res.json({ accessToken });
    });
  } catch (err) {
    res.status(500).json({ message: 'Token refresh failed' });
  }
};

// -----------------------------

const logout = async (req, res) => {
  const { refreshToken } = req.body;
  try {
    await tokenModel.removeToken(refreshToken);
    res.json({ message: 'Logged out' });
  } catch (err) {
    res.status(500).json({ message: 'Logout failed' });
  }
};

module.exports = {
  register,
  login,
  refresh,
  logout,
};
