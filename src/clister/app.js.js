const cluster = require('cluster');
const http = require('http');
const os = require('os');
const url = require('url');
const loadEnv = require('./utils/loadEnv.js');
const logger = require('./utils/logger.js');
const routes = require('./routes');

// Завантажити .env
loadEnv();

const PORT = process.env.PORT || 3000;
const APP_NAME = process.env.APP_NAME || 'MyNodeApp';

if (cluster.isMaster) {
  console.log(`⚙️ Майстер-процес ${process.pid} запущено`);
  const numCPUs = os.cpus().length;

  // Створити воркери для кожного ядра процесора
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // Обробник події виходу воркера
  cluster.on('exit', (worker, code, signal) => {
    console.log(`💀 Воркер ${worker.process.pid} загинув (код: ${code}, сигнал: ${signal}). Запускаю нового воркера...`);
    cluster.fork(); // Запустити новий воркер для підтримки кількості
  });
} else {
  // Код, який виконується воркерами
  const server = http.createServer(async (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    req.pathname = parsedUrl.pathname;
    req.query = parsedUrl.query;

    logger(req);

    for (const route of routes) {
      const match = route.match(req.method, req.pathname);
      if (match) {
        req.params = match.params;
        return route.handler(req, res);
      }
    }

    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('404 Not Found (Воркер: ' + process.pid + ')');
  });

  server.listen(PORT, () => {
    console.log(`👷 Воркер ${process.pid} слухає порт ${PORT}`);
  });
}