const Budget = require('../models/budgetModel');

// @desc    Get user budgets for a specific month
const getBudgets = async (req, res) => {
    // We'll pass the month in the query, e.g., /api/budgets?month=202509
    const month = req.query.month || new Date().getFullYear() * 100 + (new Date().getMonth() + 1);
    const budgets = await Budget.find({ user: req.user.id, month: Number(month) }).populate('category');
    res.status(200).json(budgets);
};

// @desc    Set or update a budget
const setBudget = async (req, res) => {
    const { category, amount, month } = req.body;
    if (!category || !amount || !month) {
        res.status(400);
        throw new Error('Please provide all fields');
    }

    const budget = await Budget.findOneAndUpdate(
        { user: req.user.id, category, month }, // find by this criteria
        { amount }, // update this
        { new: true, upsert: true } // options: return new & create if not found
    ).populate('category');

    res.status(200).json(budget);
};

module.exports = { getBudgets, setBudget };