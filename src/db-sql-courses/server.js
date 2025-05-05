const express = require('express');
const studentsRoutes = require('./routes/studentsRoutes');
const coursesRoutes = require('./routes/coursesRoutes');

const app = express();
app.use(express.json());

app.use('/api', studentsRoutes);
app.use('/api', coursesRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
