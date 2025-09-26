const mongoose = require('mongoose');

const recurringExpenseSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  text: { type: String, required: true },
  amount: { type: Number, required: true },
  // To track the last time this was applied
  lastAppliedMonth: { type: Number }, // 1-12
  lastAppliedYear: { type: Number },
}, { timestamps: true });

module.exports = mongoose.model('RecurringExpense', recurringExpenseSchema);