const routes = [
    {
      method: 'GET',
      path: '/',
      handler: (req, res) => {
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Welcome to the API (Воркер: ' + process.pid + ')');
      },
      match: (method, path) => method === 'GET' && path === '/',
    },
    {
      method: 'GET',
      path: '/hello/:name',
      handler: (req, res) => {
        const name = req.params.name;
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end(`Hello, ${name}! (Воркер: ${process.pid})`);
      },
      match: (method, path) => {
        const match = path.match(/^\/hello\/([^\/]+)$/);
        if (match && method === 'GET') {
          return { params: { name: match[1] } };
        }
        return null;
      },
    },
    // Додайте інші маршрути тут
  ];
  
  module.exports = routes;
  