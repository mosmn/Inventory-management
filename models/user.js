const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

UserSchema.virtual("url").get(function () {
  return "/catalog/user/" + this._id;
});

module.exports = mongoose.model("User", UserSchema);
