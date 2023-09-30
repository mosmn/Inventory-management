const express = require('express');
const router = express.Router();

const category_controller = require('../controllers/categoryController');

// Display home page
router.get('/', category_controller.homePage);

// Display a list of all categories(to any url that has /categories in it)
router.get('/categories', category_controller.getAllCategories);

// // Display a list of all items in a specific category
// router.get('/category/:id/items', getAllItemsInCategory);

// // Display details for a specific item
// router.get('/item/:id', getItemDetails);

module.exports = router;
