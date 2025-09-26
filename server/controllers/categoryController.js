const Category = require('../models/categoryModel');

// @desc    Get user categories
const getCategories = async (req, res) => {
    const categories = await Category.find({ user: req.user.id });
    res.status(200).json(categories);
};

// @desc    Add a category
const addCategory = async (req, res) => {
    const { name } = req.body;
    if (!name) {
        res.status(400);
        throw new Error('Please add a category name');
    }
    const category = await Category.create({ name, user: req.user.id });
    res.status(201).json(category);
};

// @desc    Delete a category
const deleteCategory = async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (!category || category.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('Not authorized');
    }
    await Category.findByIdAndDelete(req.params.id);
    res.status(200).json({ id: req.params.id });
};

module.exports = { getCategories, addCategory, deleteCategory };