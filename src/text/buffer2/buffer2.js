const fs = require('fs');
const path = require('path');

const inputFile = path.join(__dirname, 'data-input.txt');
const outputFile = path.join(__dirname, 'data-output.txt');


fs.stat(outputFile, (err) => {
    if (!err) {
        console.log('Output file exists. Deleting...');
        fs.unlink(outputFile, (unlinkErr) => {
            if (unlinkErr) {
                console.error('Error while deleting file:', unlinkErr.message);
                return;
            }
            console.log('Output file successfully deleted.');
            processFile();
        });
    } else if (err.code === 'ENOENT') {
        console.log('Output file does not exist. Creating new file...');
        processFile();
    } else {
        console.error('Error checking output file:', err.message);
    }
});


const processFile = () => {
    fs.readFile(inputFile, (err, data) => {
        if (err) {
            console.error('Error reading input file:', err.message);
            return;
        }

        console.log('Input file contents:', data.toString());

        // Маніпуляції з даними
        let buffer = Buffer.from(data); // Створення буфера

        // 1. Інверсія байтів (XOR з 0xFF)
        for (let i = 0; i < buffer.length; i++) {
            buffer[i] = buffer[i] ^ 0xFF;
        }
        console.log('Buffer after inversion (XOR):', buffer);

        // 2. Додавання фіксованого зміщення до кожного байта
        for (let i = 0; i < buffer.length; i++) {
            buffer[i] = (buffer[i] + 5) % 256; // Обмежуємо діапазон байтів (0-255)
        }
        console.log('Buffer after adding offset:', buffer);

        // 3. Перестановка байтів (реверс)
        buffer = Buffer.from(buffer.reverse());
        console.log('Buffer after reversing bytes:', buffer);

        // Запис оновлених даних у вихідний файл
        fs.writeFile(outputFile, buffer, (err) => {
            if (err) {
                console.error('Error writing to output file:', err.message);
            } else {
                console.log('Modified data successfully written to output file.');
            }
        });
    });
};

