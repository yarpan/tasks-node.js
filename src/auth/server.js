require('dotenv').config();
const express = require('express');
const { connectDB, sequelize } = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Connect to database
connectDB();

// Sync database tables
sequelize.sync()
    .then(() => console.log("Database synchronised"))
    .catch(error => console.error("Database error:", error));

// Root route for API introduction
app.get('/', (req, res) => {
    res.json({ message: "Welcome to the Auth API! Use /auth for authentication routes." });
});

// Define routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);;

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
