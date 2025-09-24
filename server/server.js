const express = require('express');
const dotenv = require('dotenv').config(); // <-- Add this
const connectDB = require('./config/db'); // <-- Add this

connectDB(); 

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 5001; // <-- Use port from .env file

// A simple test route to make sure the server is working
app.get('/', (req, res) => {
    res.send('API is working!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});