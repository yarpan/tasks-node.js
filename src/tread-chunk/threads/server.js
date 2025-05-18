const express = require('express');
const bodyParser = require('body-parser');
const factorialRoutes = require('./routes/factorialRoutes');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use('/api', factorialRoutes);

app.listen(port, () => {
    console.log(`Сервер працює на http://localhost:${port}`);
});
