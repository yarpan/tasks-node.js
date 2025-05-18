const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, 'requests.log');

const requestLogger = (req, res, next) => {
    const now = new Date().toISOString();
    const logEntry = `[${now}] ${req.method} ${req.path}\n`;

    fs.appendFile(logFilePath, logEntry, (err) => {
        if (err) {
            console.error('Помилка запису в лог-файл:', err);
        }
    });

    console.log(logEntry.trim());
    next();
};

module.exports = requestLogger;
