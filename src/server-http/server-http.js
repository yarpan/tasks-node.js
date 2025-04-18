// Implement the server without using Express, only through http.createServer, which: responds 
// to / - “Home Page”, 
// to /about - "About Us"
// to any other route - 404

const http = require('http');

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/plain');

    switch (req.url) {
        case '/':
            res.writeHead(200);
            res.end('Home Page');
            break;
        case '/about':
            res.writeHead(200);
            res.end('About Us');
            break;
        default:
            res.writeHead(404);
            res.end('404 Not Found');
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`SErver runs at http://localhost:${PORT}`);
});