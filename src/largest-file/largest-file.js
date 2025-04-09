// To find the largest file in a directory

const fs = require('fs').promises;
const path = require('path');

async function findLargestFile(directory) {
  try {
    const files = await fs.readdir(directory);
    let largestFile = null;
    let largestSize = 0;

    for (const file of files) {
      const filePath = path.join(directory, file);
      const stats = await fs.stat(filePath);

      if (stats.isFile() && stats.size > largestSize) {
        largestSize = stats.size;
        largestFile = filePath;
      }
    }

    return largestFile;

  } catch (err) {
    console.error(`Eror while reading directory: ${err}`);
    return null;
  }
}

const directoryToSearch = './src/largest-file'; // Замініть на потрібну директорію

findLargestFile(directoryToSearch)
  .then(largest => {
    if (largest) {
      console.log(`Largest file in directory "${directoryToSearch}": ${largest}`);
    } else {
      console.log(`Directory "${directoryToSearch}" has no no files.`);
    }
  });