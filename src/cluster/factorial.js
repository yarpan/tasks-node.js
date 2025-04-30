
function calculateFactorial(n) {
    let result = BigInt(1);
    for (let i = BigInt(2); i <= n; i++) {
        result *= i;
    }
    return result.toString();
}

module.exports = calculateFactorial;
