const express = require("express");
const router = express.Router();
const { registerUser, loginUser, aboutUser } = require("../controllers/auth");
const { protects } = require("../middlewares/auth");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/about").get(protects, aboutUser);
module.exports = router;
