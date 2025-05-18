const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, '../logs/server.log');

// Ensure the logs directory and file exist
const ensureLogFileExists = () => {
    const dir = path.dirname(logFilePath);

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    if (!fs.existsSync(logFilePath)) {
        fs.writeFileSync(logFilePath, '', { flag: 'w' });
    }
};

// Middleware for logging requests
const requestLogger = (req, res, next) => {
    ensureLogFileExists();

    const logEntry = `[${new Date().toISOString()}] ${req.method} ${req.url}\n`;
    fs.appendFile(logFilePath, logEntry, (err) => {
        if (err) {
            console.error('Failed to write to log file:', err);
        }
    });

    next();
};

module.exports = requestLogger;
