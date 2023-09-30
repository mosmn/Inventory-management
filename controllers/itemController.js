const Item = require('../models/item');
const asyncHandler = require("express-async-handler");

// Display details for a specific item
exports.getItem = asyncHandler(async (req, res) => {
    const item = await Item.findById(req.params.id).populate('category');
    res.render('item', {item});
});

