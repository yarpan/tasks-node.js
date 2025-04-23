const fs = require('fs').promises;
const path = require('path');

const logFilePath = path.join(__dirname, '../logs', 'app.log');

async function logToFile(logMessage) {
  try {
    // Перевірити, чи існує директорія logs, якщо ні - створити її
    const logsDir = path.dirname(logFilePath);
    await fs.mkdir(logsDir, { recursive: true });

    await fs.appendFile(logFilePath, logMessage + '\n', 'utf8');
  } catch (error) {
    console.error('Помилка при записі логів у файл:', error);
    // У випадку помилки, можна також виводити логи в консоль як резерв
    console.log(logMessage);
  }
}

module.exports = function logger(req) {
  const now = new Date().toISOString();
  const logMessage = `[${now}] ${req.method} ${req.url}`;
  console.log(logMessage);
  logToFile(logMessage);
};