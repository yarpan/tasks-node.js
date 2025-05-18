const express = require('express');
const httpProxy = require('http-proxy');

const app = express();
const proxy = httpProxy.createProxyServer();

const servers = [
    { target: 'http://localhost:3001' },
    { target: 'http://localhost:3002' },
    { target: 'http://localhost:3003' }
];

let currentServerIndex = 0;


// Round Robin 
app.use((req, res) => {
    const target = servers[currentServerIndex].target;
    currentServerIndex = (currentServerIndex + 1) % servers.length;

    proxy.web(req, res, { target }, err => {
        res.status(500).send(`Помилка проксі: ${err.message}`);
    });
});


// Запуск проксі
app.listen(3000, () => {
    console.log('Express Round Robin Proxy працює на http://localhost:3000');
});


// Запуск серверів
servers.forEach(({ target }, index) => {
    const serverApp = express();

    serverApp.get('/', (req, res) => {
        res.send(`Сервер ${index + 1} відповів на запит!`);
    });

    const [host, port] = target.replace('http://', '').split(':');
    serverApp.listen(port, () => {
        console.log(`Сервер ${index + 1} працює на ${target}`);
    });
});
