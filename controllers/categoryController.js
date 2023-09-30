const Category = require('../models/category');
const Item = require('../models/item');
const asyncHandler = require("express-async-handler");

// Display home page
exports.homePage = asyncHandler(async (req, res) => {
    const categories = await Category.find({});
    const itemsAlmostOutOfStock = await Item.find({number_in_stock: {$lte: 30}}).populate('category');
    res.render('index', {categories, itemsAlmostOutOfStock });
});

exports.getItemsInCategory = asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);
    const categories = await Category.find({});
    const items = await Item.find({category: req.params.id});
    res.render('itemsInCategory', {category, categories, items});
});

