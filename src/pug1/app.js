const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

const users = [
    { name: 'Vasyl Kisyl', age: 30, email: 'vasyl.kisyl@mail.com' },
    { name: 'Petro Mohyla', age: 25, email: 'petro.mohyla@mail.com' },
    { name: 'Ivan Kolotylo', age: 35, email: 'ivan.kolotylo@mail.com' }
];


app.get('/users', (req, res) => {
    res.render('users', { users });
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
