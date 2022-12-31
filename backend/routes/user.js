const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");
const authGuard = require("../middleware/auth-guard");
const {
  getSignin,
  getSignup,
  postSignin,
  postSingnup,
  getProfile,
} = require("../controller/user/user");
const {
  signinValidation,
  signupValidation,
} = require("../controller/user/validate");
router.get("/profile", authGuard, getProfile);
router.get("/signin", checkAuth, getSignin);
router.get("/signup", checkAuth, getSignup);
router.post("/signin", signinValidation, postSignin);
router.post("/signup", signupValidation, postSingnup);
router.get("/logout", authGuard, (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});
module.exports = router;
