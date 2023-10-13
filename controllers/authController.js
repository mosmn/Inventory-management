const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

exports.getSignUp = asyncHandler(async (req, res) => {
  res.render("signUp");
});

exports.postSignUp = asyncHandler(async (req, res) => {
  try {
    const user = new User({
      username: req.body.username,
      password: req.body.password,
    });
    const result = await user.save();
    res.redirect("/");
  } catch (err) {
    return next(err);
  }
});
