const Category = require('../models/category');
const Item = require('../models/item');
const asyncHandler = require("express-async-handler");

// Display home page
exports.homePage = asyncHandler(async (req, res) => {
    const categories = await Category.find({});
    const itemsAlmostOutOfStock = await Item.find({number_in_stock: {$lte: 30}}).populate('category');
    res.render('index', { title: 'GrocifyPro', categories, itemsAlmostOutOfStock });
});

exports.getAllCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find({});
    res.render('innerlayout', {categories});
});