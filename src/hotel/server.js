const express = require('express');
const app = express();
const requestLogger = require('./middleware/logger');

// Import other routes
const guestsRoutes = require('./routes/guestsRoutes');
const roomsRoutes = require('./routes/roomsRoutes');
const bookingsRoutes = require('./routes/bookingsRoutes');
const setupSwagger = require('./routes/swagger'); // Import swagger.js

app.use(requestLogger);

app.use(express.json());

// Setup routes
app.use('/guests', guestsRoutes);
app.use('/rooms', roomsRoutes);
app.use('/bookings', bookingsRoutes);

// Setup Swagger documentation
setupSwagger(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`API Documentation is available at http://localhost:${PORT}/api-docs`);
});