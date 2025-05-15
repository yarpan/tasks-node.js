const express = require('express');
const app = express();
const logger = require('./db/logger');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json')

const studentsRoutes = require('./routes/studentsRoutes');
const coursesRoutes = require('./routes/coursesRoutes');
const enrollmentsRoutes = require('./routes/enrollmentsRoutes');

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/students', studentsRoutes);
app.use('/api/courses', coursesRoutes);
app.use('/api/enrollments', enrollmentsRoutes);

app.use((req, res, next) => {
    logger.info(`Запит: ${req.method} ${req.url}`);
    next();
});

app.use((err, req, res, next) => {
    logger.error(`Помилка: ${err.message}`);
    res.status(500).json({ error: 'Внутрішня помилка сервера' });
});

// Додаємо Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`API Documentation is available at http://localhost:${PORT}/api-docs`);
});