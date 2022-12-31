"use strict";

module.exports = function (req, res, next) {
  var _req$session = req.session,
      isAuth = _req$session.isAuth,
      userId = _req$session.userId;

  if (isAuth && userId) {
    return res.redirect("/api/user/profile");
  }

  next();
};