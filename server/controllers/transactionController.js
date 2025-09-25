const Transaction = require('../models/transactionModel');

// @desc    Get transactions
// @route   GET /api/transactions
// @access  Private
const getTransactions = async (req, res) => {
  const transactions = await Transaction.find({ user: req.user.id });
  res.status(200).json(transactions);
};

// @desc    Add transaction
// @route   POST /api/transactions
// @access  Private
const addTransaction = async (req, res) => {
  const { text, amount, type } = req.body;

  if (!text || !amount || !type) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  const transaction = await Transaction.create({
    text,
    amount,
    type,
    user: req.user.id,
  });

  res.status(201).json(transaction);
};

module.exports = {
  getTransactions,
  addTransaction,
};