const express = require('express');
const router = express.Router();

const category_controller = require('../controllers/categoryController');
const item_controller = require('../controllers/itemController');

// Display home page
router.get('/', category_controller.homePage);

// Display a list of all items in a specific category
router.get('/category/:id/items', category_controller.getItemsInCategory);

// Display details for a specific item
router.get('/item/:id', item_controller.getItem);

module.exports = router;
