const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');

// GET /api/users
const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users' });
  }
};

// GET /api/users/:id
const getUserById = async (req, res) => {
  const { id } = req.params;
  const currentUser = req.user;

  if (currentUser.role !== 'admin' && currentUser.id !== parseInt(id)) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  try {
    const user = await userModel.getUserById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user' });
  }
};

// PUT /api/users/:id
const updateUser = async (req, res) => {
  const { id } = req.params;
  const currentUser = req.user;
  const { username, email, password } = req.body;

  if (currentUser.role !== 'admin' && currentUser.id !== parseInt(id)) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  try {
    const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

    const updatedUser = await userModel.updateUser(id, {
      username,
      email,
      password: hashedPassword,
    });

    res.json({ message: 'User updated', user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: 'Error updating user' });
  }
};

// DELETE /api/users/:id
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    await userModel.deleteUser(id);
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user' });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
