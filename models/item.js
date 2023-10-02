const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  description: { type: String, required: true, maxLength: 1000 },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  price: { type: Number, required: true },
  number_in_stock: { type: Number, required: true },
  image: { type: Buffer, ContentType: String },
});

ItemSchema.virtual("url").get(function () {
  return "/catalog/item/" + this._id;
});

module.exports = mongoose.model("Item", ItemSchema);
