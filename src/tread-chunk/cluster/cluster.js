// Implement a basic cluster configuration for the Node.js server to take advantage of all CPU cores to process requests. 
// Make sure the server is able to scale to multiple cores.

const cluster = require('cluster');
const os = require('os');
const http = require('http');
const calculateFactorial = require('./factorial');
const generateWeightedRandomNumbers = require('./randomizer');

const PORT = process.env.PORT || 3000;


if (cluster.isMaster) {
    const numCPUs = os.cpus().length;
    const workers = [];
    let results = {};
    let pendingTasks = 0;
    let participatingWorkers = new Set();

    console.log(`Master PID: ${process.pid}`);
    console.log(`Creating ${numCPUs} workers...`);
    
    for (let i = 0; i < numCPUs; i++) {
        const worker = cluster.fork();
        workers.push(worker);
        
        worker.on('message', (message) => {
            if (message.task === 'factorialResult') {
                results[message.number] = message.result;
                pendingTasks--;
                participatingWorkers.add(worker.process.pid);
            }
        });

        worker.on('exit', () => {
            console.log(`Worker PID ${worker.process.pid} exited.`);
        });

    }


    const distributeTasks = (numbers, res) => {
        pendingTasks = numbers.length;
        results = {};
        participatingWorkers.clear();

        numbers.forEach((number, index) => {
            const worker = workers[index % workers.length];
            worker.send({ task: 'calculateFactorial', number });
            if (!participatingWorkers.has(worker.process.pid)) {
                participatingWorkers.add(worker.process.pid);
            }
        });
        
        const interval = setInterval(() => {
            if (pendingTasks === 0) {
                clearInterval(interval);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    results,
                    participatingWorkers: Array.from(participatingWorkers)
                }));
            }
        }, 50);
    };


    const server = http.createServer((req, res) => {
        const url = new URL(req.url, `http://localhost:${PORT}`);
        if (url.pathname === '/factorial') {
            const range = parseInt(url.searchParams.get('range') || numCPUs, 10);
            const numbers = generateWeightedRandomNumbers(range, Math.min(range, numCPUs));
            distributeTasks(numbers, res);
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('404 Not Found');
        }
    });

    server.listen(PORT, () => {
        console.log(`Master listening on port ${PORT}`);
    });
} else {
    process.on('message', (message) => {
        if (message.task === 'calculateFactorial') {
            const number = message.number;
            const result = calculateFactorial(BigInt(number));
            process.send({ task: 'factorialResult', number, result });
        }
    });

    console.log(`Worker PID ${process.pid} ready`);
}

