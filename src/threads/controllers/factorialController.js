const { Worker } = require('worker_threads');
const path = require('path');

exports.calculateFactorial = (req, res) => {
    const { number } = req.query;

    if (!number || isNaN(number) || number < 0) {
        return res.status(400).send('Введіть правильне число.');
    }

    const worker = new Worker(path.join(__dirname, '../workers/factorialWorker.js'));

    worker.postMessage(parseInt(number)); 


    worker.on('message', (result) => {
        res.status(200).json({ factorial: result });
    });

    worker.on('error', (error) => {
        res.status(500).send(`Помилка Worker: ${error.message}`);
    });

    worker.on('exit', (code) => {
        if (code !== 0) {
            console.error(`Worker завершив роботу з кодом ${code}`);
        }
    });
};
