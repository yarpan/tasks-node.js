// Прочитати файл source.txt і скопіювати його в copy.txt

const fs = require('fs');

// Read the content of source.txt
fs.readFile('./src/source.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading source.txt:', err);
    return;
  }

  // Write the content to copy.txt
  fs.writeFile('./src/copy.txt', data, (err) => {
    if (err) {
      console.error('Error writing to copy.txt:', err);
    } else {
      console.log('Content copied successfully!');
    }
  });
});