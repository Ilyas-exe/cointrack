const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', // This creates a relationship with the User model
    },
    text: {
      type: String,
      required: [true, 'Please add some text'],
    },
    amount: {
      type: Number,
      required: [true, 'Please add a positive or negative number'],
    },
    type: {
        type: String,
        required: true,
        enum: ['income', 'expense'], // Amount can only be one of these
    },
    category: { // <-- ADD THIS
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Transaction', transactionSchema);