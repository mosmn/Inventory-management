const express = require("express");
const router = express.Router();

const category_controller = require("../controllers/categoryController");
const item_controller = require("../controllers/itemController");

//category routes
router.get("/", category_controller.homePage);

router.get("/category/:id/items", category_controller.getItemsInCategory);

router.get("/category/add-new", category_controller.getAddNewCategory);

router.post("/category/add-new", category_controller.postAddNewCategory);

router.post(
  "/category/:id/items/delete",
  category_controller.postDeleteCategory,
);

router.get("/category/:id/items/update", category_controller.getUpdateCategory);

router.post(
  "/category/:id/items/update",
  category_controller.postUpdateCategory,
);

//item routes
router.get("/item/:id", item_controller.getItem);

router.get("/category/:id/items/add-new-item", item_controller.getAddNewItem);

router.post("/category/:id/items/add-new-item", item_controller.postAddNewItem);

router.get("/item/:id/update", item_controller.getUpdateItem);

router.post("/item/:id/update", item_controller.postUpdateItem);

router.post("/item/:id/delete", item_controller.postDeleteItem);

module.exports = router;
