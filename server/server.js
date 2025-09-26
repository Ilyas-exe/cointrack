const express = require('express');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');

connectDB(); 

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/transactions', require('./routes/transactionRoutes'));
app.use('/api/currency', require('./routes/currencyRoutes'));
app.use('/api/recurring', require('./routes/recurringRoutes'));

const PORT = process.env.PORT || 5001; 


app.get('/', (req, res) => {
    res.send('API is working!');
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});