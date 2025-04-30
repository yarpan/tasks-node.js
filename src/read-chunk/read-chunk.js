
const fs = require('fs');

const text = 'Loren Ipsun simple text for sample data file.\n';
const filePath = './src/read-chunk/read-chunk.txt';
fs.writeFileSync(filePath, text.repeat(100));
console.log(`\nTest File "${filePath}" is created.`);


const readStream = fs.createReadStream('./src/read-chunk/read-chunk.txt', { encoding: 'utf8', highWaterMark: 1 * 1024 });

readStream.on('data', (chunk) => {
    console.log('\nChunk of data:', chunk);
});

readStream.on('end', () => {
    console.log('\nReading of the file is finished.');
});

readStream.on('error', (error) => {
    console.error('\nError: ', error);
});
