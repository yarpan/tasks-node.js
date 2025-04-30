// Create a Transform stream that replaces all occurrences of “password” with “********”

const fs = require('fs');
const { Transform } = require('stream');

const inputFilePath = './src/stream-replace/file-input.txt';
const outputFilePath = './src/stream-replace/file-output.txt';


class PasswordMasker extends Transform {
    constructor(options) {
        super(options);
    }

    _transform(chunk, encoding, callback) {
        const data = chunk.toString();
        const maskedData = data.replace(/password/gi, '********'); // global. case insensetive
        this.push(maskedData);
        callback();
    }
}


const inputStream = fs.createReadStream(inputFilePath, { encoding: 'utf8' });
const passwordMasker = new PasswordMasker();
const outputStream = fs.createWriteStream(outputFilePath);

inputStream.pipe(passwordMasker).pipe(outputStream);

outputStream.on('finish', () => {
    console.log(`Файл "${outputFilePath}" створено з заміненимтекстом.`);
});
