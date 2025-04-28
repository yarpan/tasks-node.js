const { parentPort } = require('worker_threads');


function factorial(n) {
    if (n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
}


parentPort.on('message', (number) => {
    const result = factorial(number);
    parentPort.postMessage(result); // Відправляємо результат назад
});
