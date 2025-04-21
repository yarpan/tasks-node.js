const fs = require('fs');
const path = require('path');

const logsDirectory = path.join(__dirname, '../logs');
if (!fs.existsSync(logsDirectory)) {
    fs.mkdirSync(logsDirectory, { recursive: true });
}

module.exports = function logger(req) {
    const now = new Date().toISOString();
    const logMessage = `[${now}] ${req.method} ${req.url}\n`;

    console.log(logMessage.trim());

    const logFilePath = path.join(logsDirectory, 'access.log');

    fs.appendFile(logFilePath, logMessage, (err) => {
        if (err) {
            console.error(`Failed to write to log file: ${err.message}`);
        }
    });
};
