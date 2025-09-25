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
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    // Make sure the logged in user matches the transaction user
    if (transaction.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    // Use findByIdAndDelete instead of remove()
    await Transaction.findByIdAndDelete(req.params.id);

    res.status(200).json({ id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update transaction
// @route   PUT /api/transactions/:id
// @access  Private
const updateTransaction = async (req, res) => {
  const transaction = await Transaction.findById(req.params.id);

  if (!transaction) {
    res.status(404);
    throw new Error('Transaction not found');
  }

  // Check for user and ownership
  if (!req.user || transaction.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const updatedTransaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, {
    new: true, // This will create it if it doesn't exist
  });

  res.status(200).json(updatedTransaction);
};

module.exports = {
  getTransactions,
  addTransaction,
  deleteTransaction,
  updateTransaction,
};