const express = require("express");
const router = express.Router();

const auth_controller = require("../controllers/authController");

router.get("/sign-up", auth_controller.getSignUp);

router.post("/sign-up", auth_controller.postSignUp);

router.get("/log-in", auth_controller.getLogIn);

router.post("/log-in", auth_controller.postLogIn);

router.get("/log-out", auth_controller.getLogOut);

module.exports = router;
