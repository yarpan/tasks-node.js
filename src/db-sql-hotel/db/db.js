
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

(async () => {
    try {
        const client = await pool.connect();
        console.log('Successfully connected to PostgreSQL database!');
        client.release(); // Випускаємо клієнта назад в пул
    } catch (err) {
        console.error('Error connecting to PostgreSQL database:', err.message);
    }
})();

pool.on('error', (err) => {
    console.error('Unexpected error on idle client:', err.message);
});

module.exports = pool;
