// server.js

const express = require('express');

const app = express();

const PORT = 5001; // We will move this to a .env file later

// A simple test route to make sure the server is working
app.get('/', (req, res) => {
    res.send('API is working!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});