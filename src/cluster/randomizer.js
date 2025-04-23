// Generate weighted random numbers
function generateWeightedRandomNumbers(range, count) {
    const weights = Array.from({ length: range }, (_, i) => 1 / (i + 1)); 
    const totalWeight = weights.reduce((sum, weight) => sum + weight, 0); 

    return Array.from({ length: count }, () => {
        const random = Math.random() * totalWeight;
        let accumulatedWeight = 0;

        for (let i = 0; i < range; i++) {
            accumulatedWeight += weights[i];
            if (random < accumulatedWeight) {
                return i + 1; 
            }
        }
    });
}

module.exports = generateWeightedRandomNumbers;
