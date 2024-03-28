const express = require('express');
const app = express();
app.get('/get', (req, res) => {
    res.json("GET method: home");
});
app.post('/post', (req, res) => {
    res.json("POST method: home");
});
PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});