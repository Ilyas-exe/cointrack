const RecurringExpense = require('../models/recurringExpenseModel');
const Transaction = require('../models/transactionModel');

// @desc    Get all recurring expenses
// @route   GET /api/recurring
const getRecurring = async (req, res) => {
  const expenses = await RecurringExpense.find({ user: req.user.id });
  res.status(200).json(expenses);
};

// @desc    Add a recurring expense
// @route   POST /api/recurring
const addRecurring = async (req, res) => {
  const { text, amount } = req.body;
  const expense = await RecurringExpense.create({
    text,
    amount,
    user: req.user.id,
  });
  res.status(201).json(expense);
};

// @desc    Apply recurring expenses for the current month
// @route   POST /api/recurring/apply
const applyRecurring = async (req, res) => {
  const recurringExpenses = await RecurringExpense.find({ user: req.user.id });
  const currentMonth = new Date().getMonth() + 1; // 1-12
  const currentYear = new Date().getFullYear();
  const newTransactions = [];

  for (const expense of recurringExpenses) {
    // Check if it's a new month or it has never been applied
    const hasBeenAppliedThisMonth = expense.lastAppliedMonth === currentMonth && expense.lastAppliedYear === currentYear;

    if (!hasBeenAppliedThisMonth) {
      // Create a new transaction from the template
      const transaction = await Transaction.create({
        user: req.user.id,
        text: expense.text,
        amount: expense.amount,
        type: 'expense',
      });
      newTransactions.push(transaction);

      // Update the template with the current month/year
      expense.lastAppliedMonth = currentMonth;
      expense.lastAppliedYear = currentYear;
      await expense.save();
    }
  }
  res.status(201).json(newTransactions);
};

module.exports = { getRecurring, addRecurring, applyRecurring };