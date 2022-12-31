"use strict";

module.exports.getCreate = function (req, res, next) {
  var isAuth = req.session.isAuth;
  res.render("./post/create", {
    title: "create-post",
    isAuth: isAuth
  });
};

module.exports.getEdit = function (req, res, next) {
  var isAuth = req.session.isAuth;
  res.render("./post/edit", {
    title: "edit-post",
    isAuth: isAuth
  });
};