const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  description: { type: String, required: true, maxLength: 1000 },
  image: { type: String, required: true },
});

CategorySchema.virtual("url").get(function () {
  return "/catalog/category/" + this._id + "/items";
});

module.exports = mongoose.model("Category", CategorySchema);
