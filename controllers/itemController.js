const Item = require("../models/item");
const Category = require("../models/category");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const multer = require("multer");
const path = require("path");

const storage = multer.memoryStorage();

const upload = multer({ storage });

exports.getItem = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id).populate("category");
  res.render("item", { item });
});

exports.getAddNewItem = asyncHandler(async (req, res) => {
  const categories = await Category.find();
  res.render("addNewItem", { title: "Add New Item", categories });
});

exports.postAddNewItem = [
  upload.single("image"),

  (req, res, next) => {
    if (!req.file) {
      req.fileValidationError = "Image is required.";
    }
    next();
  },

  body("name", "Item name required").trim().isLength({ min: 1 }).escape(),
  body("description", "Description required")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("category", "Category required").trim().isLength({ min: 1 }).escape(),
  body("price", "Invalid price").isFloat({ min: 0.01 }),
  body("number_in_stock", "Invalid stock quantity").isInt({ min: 0 }),

  asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    const item = new Item({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      number_in_stock: req.body.number_in_stock,
      image: req.file ? req.file.buffer : undefined,
    });

    if (!errors.isEmpty() || req.fileValidationError) {
      const categories = await Category.find();
      res.render("addNewItem", {
        title: "Add New Item",
        categories,
        item,
        errors: errors.array(),
      });
    } else {
      await item.save();
      res.redirect(item.url);
    }
  }),
];

exports.postDeleteItem = asyncHandler(async (req, res) => {
  const item = await Item.findOneAndRemove({ _id: req.params.id }).populate(
    "category",
  );

  if (item) {
    res.redirect(item.category.url);
  } else {
    res.redirect("/");
  }
});

exports.getUpdateItem = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id).populate("category");
  const categories = await Category.find();
  res.render("addNewItem", {
    title: "Update Item",
    item,
    categories,
    isUpdate: true,
  });
});

exports.postUpdateItem = [
  upload.single("image"),

  body("name", "Item name required").trim().isLength({ min: 1 }).escape(),
  body("description", "Description required")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("category", "Category required").trim().isLength({ min: 1 }).escape(),
  body("price", "Invalid price").isFloat({ min: 0.01 }),
  body("number_in_stock", "Invalid stock quantity").isInt({ min: 0 }),

  asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    const item = new Item({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      number_in_stock: req.body.number_in_stock,
      _id: req.params.id,
    });

    if (req.file) {
      item.image = req.file.buffer;
    }

    if (!errors.isEmpty()) {
      const categories = await Category.find();
      res.render("addNewItem", {
        title: "Update Item",
        item,
        categories,
        errors: errors.array(),
        isUpdate: true,
      });
    } else {
      await Item.findByIdAndUpdate(req.params.id, item);
      res.redirect(item.url);
    }
  }),
];
