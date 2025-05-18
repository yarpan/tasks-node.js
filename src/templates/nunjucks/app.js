express = require('express');
const nunjucks = require('nunjucks');
const app = express();
const PORT = 3000;


nunjucks.configure('views', {
    autoescape: true,
    express: app
});


app.get('/', (req, res) => {
    res.send('Welcome to the Home Page!');
});


const users = [
    { name: 'Vasyl Kisyl', age: 30, email: 'vasyl.kisyl@example.com' },
    { name: 'Petro Mohyla', age: 25, email: 'petro.mohyla@example.com' },
    { name: 'Ostap Gopko', age: 35, email: 'ostap.gopko@example.com' }
];


app.get('/', (req, res) => {
    res.render('home.njk', { title: 'Home Page', message: 'Welcome to the Home Page!' });
});


app.get('/users', (req, res) => {
    res.render('users.njk', { users });
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
