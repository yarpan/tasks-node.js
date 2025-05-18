// Пошук і заміна в текстовому файлі 
// Замінити всі входження слова Node на NODE.JS і зберегти у новий файл

const fs = require('fs');

// Read the content of source.txt
fs.readFile('./src/text-replace/text-source.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading source.txt:', err);
        return;
    }

    // Replace all occurrences of "Node" with "NODE.JS"
    const updatedData = data.replace(/Node/g, 'NODE.JS');

    // Save the updated content to a new file
    fs.writeFile('./src/text-replace/text-target.txt', updatedData, (err) => {
        if (err) {
            console.error('Error writing to updated.txt:', err);
        } else {
            console.log('Search and replace completed successfully!');
        }
    });
});