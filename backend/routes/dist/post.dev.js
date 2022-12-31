"use strict";

var express = require("express");

var router = express.Router();

var _require = require("../controller/post/post"),
    getCreate = _require.getCreate,
    getEdit = _require.getEdit;

router.get("/", function (req, res, next) {
  var isAuth = req.session.isAuth;
  res.render("index", {
    title: "post",
    isAuth: isAuth
  });
});
router.get("/create", getCreate);
router.get("/edit", getEdit);
module.exports = router;