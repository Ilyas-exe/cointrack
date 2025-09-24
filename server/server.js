const express = require('express');
const dotenv = require('dotenv').config(); // <-- Add this
const connectDB = require('./config/db'); // <-- Add this

connectDB(); // <-- Add this to connect to the DB

const app = express();

const PORT = process.env.PORT || 5001; // <-- Use port from .env file

// A simple test route to make sure the server is working
app.get('/', (req, res) => {
    res.send('API is working!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});