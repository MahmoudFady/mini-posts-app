"use strict";

var express = require("express");

var router = express.Router();

var checkAuth = require("../middleware/checkAuth");

var authGuard = require("../middleware/auth-guard");

var _require = require("../controller/user/user"),
    getSignin = _require.getSignin,
    getSignup = _require.getSignup,
    postSignin = _require.postSignin,
    postSingnup = _require.postSingnup,
    getProfile = _require.getProfile;

var _require2 = require("../controller/user/validate"),
    signinValidation = _require2.signinValidation,
    signupValidation = _require2.signupValidation;

router.get("/profile", authGuard, getProfile);
router.get("/signin", checkAuth, getSignin);
router.get("/signup", checkAuth, getSignup);
router.post("/signin", signinValidation, postSignin);
router.post("/signup", signupValidation, postSingnup);
router.get("/logout", authGuard, function (req, res, next) {
  req.session.destroy(function () {
    res.redirect("/");
  });
});
module.exports = router;