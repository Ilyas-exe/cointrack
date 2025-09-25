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

// @desc    Delete transaction
// @route   DELETE /api/transactions/:id
// @access  Private
const deleteTransaction = async (req, res) => {
  const transaction = await Transaction.findById(req.params.id);

  if (!transaction) {
    res.status(404);
    throw new Error('Transaction not found');
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  // Make sure the logged in user matches the transaction user
  if (transaction.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  await transaction.remove();

  res.status(200).json({ id: req.params.id });
};


module.exports = {
  getTransactions,
  addTransaction,
  deleteTransaction,
};