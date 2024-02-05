const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const passport = require("../config/passport");

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

exports.getLogIn = asyncHandler(async (req, res) => {
  res.render("logIn");
}
);

exports.postLogIn = passport.authenticate("local", {
  successRedirect: "/catalog/dashboard",
  failureRedirect: "/catalog/auth/log-in",
});

exports.getLogOut = asyncHandler((req, res) => {
  req.logout((err) => {
    if (err) {
      console.error(err);
    }
    res.redirect("/");
  });
});
