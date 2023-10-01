const Category = require("../models/category");
const Item = require("../models/item");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "public/images/",
  filename: (req, file, cb) => {
    const fileExtension = path.extname(file.originalname);

    const uniqueFilename = Date.now() + "-" + Math.round(Math.random() * 1e9);

    const finalFilename = uniqueFilename + fileExtension;

    cb(null, finalFilename);
  },
});

const upload = multer({ storage });

exports.homePage = asyncHandler(async (req, res) => {
  const categories = await Category.find({});
  const itemsAlmostOutOfStock = await Item.find({
    number_in_stock: { $lte: 30 },
  }).populate("category");
  res.render("index", { categories, itemsAlmostOutOfStock });
});

exports.getItemsInCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  const categories = await Category.find({});
  const items = await Item.find({ category: req.params.id });
  res.render("itemsInCategory", { category, categories, items });
});

exports.getAddNewCategory = asyncHandler(async (req, res) => {
  res.render("addNewCategory", { title: "Add new category" });
});

exports.postAddNewCategory = [
  upload.single("image"),

  (req, res, next) => {
    if (!req.file) {
      // No image file uploaded
      req.fileValidationError = "Image is required.";
    }
    next();
  },

  body("name", "Category name required").trim().isLength({ min: 1 }).escape(),

  asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    const category = new Category({
      name: req.body.name,
      description: req.body.description,
      image: req.file ? req.file.filename : undefined,
    });

    if (!errors.isEmpty() || req.fileValidationError) {
      res.render("addNewCategory", {
        title: "Add new category",
        category,
        errors: errors.array(),
      });
    } else {
      const categoryExists = await Category.findOne({ name: req.body.name })
        .collation({ locale: "en", strength: 2 })
        .exec();
      if (categoryExists) {
        res.redirect(categoryExists.url);
      } else {
        await category.save();
        res.redirect(category.url);
      }
    }
  }),
];

exports.postDeleteCategory = asyncHandler(async (req, res) => {
  const categoryId = req.params.id;

  await Item.deleteMany({ category: categoryId });

  await Category.findByIdAndRemove(categoryId);

  res.redirect("/");
});

exports.getUpdateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  const isUpdate = true;
  res.render("addNewCategory", {
    title: "Update category",
    category,
    isUpdate,
  });
});

exports.postUpdateCategory = [
  upload.single("image"),

  (req, res, next) => {
    if (!req.file) {
      // No image file uploaded
      req.fileValidationError = "Image is required.";
    }
    next();
  },

  body("name", "Category name required").trim().isLength({ min: 1 }).escape(),

  asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    const category = new Category({
      name: req.body.name,
      description: req.body.description,
      image: req.file ? req.file.filename : undefined,
      _id: req.params.id,
    });

    if (!errors.isEmpty() || req.fileValidationError) {
      res.render("addNewCategory", {
        title: "Update category",
        category,
        errors: errors.array(),
      });
    } else {
      const categoryExists = await Category.findOne({ name: req.body.name })
        .collation({ locale: "en", strength: 2 })
        .exec();
      if (categoryExists) {
        res.redirect(categoryExists.url);
      } else {
        await Category.findByIdAndUpdate(req.params.id, category);
        res.redirect(category.url);
      }
    }
  }),
];
