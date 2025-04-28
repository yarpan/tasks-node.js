const express = require('express');
const path = require('path');
const commandRoutes = require('./routes/commandRoutes');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/', commandRoutes);


app.listen(port, () => {
    console.log(`Сервер запущено на http://localhost:${port}`);
});
