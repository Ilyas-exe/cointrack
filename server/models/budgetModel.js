const mongoose = require('mongoose');

const budgetSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Category',
    },
    amount: {
        type: Number,
        required: [true, 'Please add a budget amount'],
    },
    month: { // e.g., 202509 for September 2025
        type: Number,
        required: true,
    }
}, { timestamps: true });

module.exports = mongoose.model('Budget', budgetSchema);