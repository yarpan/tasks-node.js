// Create a Docker container for a web application written in Node.js. 
// The Docker container must have Node.js installed, and the web application must be available on a specific port.

const http = require('http');
const PORT = 3000;

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello from Docker!\n');
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});