const fs = require('fs');
fs.readFile('index.txt', 'utf8', (err, data) => {
    if (err) {
        throw err;
    }
    console.log("Original file contents:", data);
    const modifiedContent = data.toUpperCase();
    fs.writeFile('index.txt', modifiedContent, (err) => {
        if (err) {
            throw err;
        }
        console.log("File content modified and written back");
    });
});
