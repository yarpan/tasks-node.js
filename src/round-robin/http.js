const http = require('http');

const servers = [
    { host: 'localhost', port: 3001 },
    { host: 'localhost', port: 3002 },
    { host: 'localhost', port: 3003 }
];

let currentServerIndex = 0;

// Створення проксі
const proxy = http.createServer((req, res) => {
    const target = servers[currentServerIndex];
    currentServerIndex = (currentServerIndex + 1) % servers.length;

    const options = {
        hostname: target.host,
        port: target.port,
        path: req.url,
        method: req.method,
        headers: req.headers
    };


    const proxyReq = http.request(options, proxyRes => {
        res.writeHead(proxyRes.statusCode, proxyRes.headers);
        proxyRes.pipe(res);
    });


    proxyReq.on('error', err => {
        res.writeHead(500);
        res.end(`Помилка проксі: ${err.message}`);
    });

    req.pipe(proxyReq);
});


proxy.listen(3000, () => {
    console.log('Round Robin Proxy працює на http://localhost:3000');
});


// Запуск серверів
servers.forEach((server, index) => {
    http.createServer((req, res) => {
        res.end(`Сервер ${index + 1} відповів на запит!`);
    }).listen(server.port, () => {
        console.log(`Сервер ${index + 1} працює на http://${server.host}:${server.port}`);
    });
});
