const bcrypt = require('bcrypt');
const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken
} = require('../config/token');

const userModel = require('../models/user.model');

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await userModel.getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userModel.createUser({ username, email, password: hashedPassword });

    res.status(201).json({ message: 'User registered', user: { id: newUser.id, username: newUser.username } });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    await userModel.saveRefreshToken(user.id, refreshToken);

    res.json({ accessToken, refreshToken });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

const refresh = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) return res.status(400).json({ message: 'Refresh token required' });

    const payload = verifyRefreshToken(refreshToken);
    const user = await userModel.getUserById(payload.id);

    if (!user || user.refresh_token !== refreshToken) {
      return res.status(403).json({ message: 'Invalid refresh token' });
    }

    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    await userModel.saveRefreshToken(user.id, newRefreshToken);

    res.json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
  } catch (err) {
    console.error('Refresh error:', err);
    res.status(401).json({ message: 'Invalid or expired refresh token' });
  }
};

const logout = async (req, res) => {
  try {
    const { userId } = req.body;

    await userModel.saveRefreshToken(userId, null);
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (err) {
    console.error('Logout error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  register,
  login,
  refresh,
  logout
};
