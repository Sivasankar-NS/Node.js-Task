const express = require('express');
const app = express();
const logRequestDetails = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url}`);
    next();
};
app.use(logRequestDetails);
app.get('/', (req, res) => {
    res.send('GET request received');
});
app.post('/', (req, res) => {
    console.log('POST request received with data:', req.body);
    res.send('POST request received');
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
