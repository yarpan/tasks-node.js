// Implement a Node.js program that reads a file in binary data format 
// and outputs the contents of this file to the console using Buffer.


const fs = require('fs');
const path = require('path');

const fileName = 'data.bin';
const filePath = path.join(__dirname, fileName);
const dataFileSize = 4096; // 4KB

// Ensure file creation or deletion if it already exists
fs.stat(filePath, (err) => {
    if (!err) {
        // File exists, delete it
        console.log('File exists. Deleting...');
        fs.unlink(filePath, (unlinkErr) => {
            if (unlinkErr) {
                console.error('Error while deleting file:', unlinkErr.message);
                return;
            }
            console.log('File sucessfuly deleted.');
            createAndFillFile();
        });
    } else if (err.code === 'ENOENT') {
        // File does not exist, create and fill it
        createAndFillFile();
    } else {
        console.error('Error checking file:', err.message);
    }
});

// Function to create and fill the file with binary data
const createAndFillFile = () => {
    const buffer = Buffer.alloc(dataFileSize);

    // Fill buffer with random binary data
    for (let i = 0; i < buffer.length; i++) {
        buffer[i] = Math.floor(Math.random() * 256);
    }

    // Write buffer to the file
    fs.writeFile(filePath, buffer, (err) => {
        if (err) {
            console.error('Error while wrighting to file:', err.message);
        } else {
            console.log(
                `File '${fileName}' filled with random data of size ${dataFileSize / 1024} KB.`
            );
            readFileContents(); // Read file after it has been created
        }
    });
};

// Read the file and output its contents in Buffer format
const readFileContents = () => {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.error('Error reading file:', err.message);
        } else {
            console.log('File contents in Buffer format:');
            console.log(data);
        }
    });
};
