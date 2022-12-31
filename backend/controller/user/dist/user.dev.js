"use strict";

var _require = require("express-validator"),
    validationResult = _require.validationResult;

var User = require("../../model/user");

module.exports.getProfile = function _callee(req, res, next) {
  var userId, user;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          userId = req.session.userId;
          _context.next = 3;
          return regeneratorRuntime.awrap(User.findById(userId));

        case 3:
          user = _context.sent;
          console.log(user);
          res.render("./user/profile", {
            user: user,
            isAuth: true
          });

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
};

module.exports.getSignup = function (req, res, next) {
  var isAuth = req.session.isAuth;
  res.render("./user/signup", {
    title: "signup",
    isAuth: isAuth
  });
};

module.exports.getSignin = function (req, res, next) {
  var isAuth = req.session.isAuth;
  res.render("./user/signin", {
    title: "signin",
    isAuth: isAuth
  });
};

module.exports.postSingnup = function _callee2(req, res, next) {
  var result, errors, _req$body, name, email, password, existedUser, createdUser;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          result = validationResult(req);

          if (!result.isEmpty()) {
            errors = result.errors.map(function (err) {
              return err.msg;
            });
            res.render("./user/signup", {
              title: "signup",
              errors: errors
            });
          }

          _req$body = req.body, name = _req$body.name, email = _req$body.email, password = _req$body.password;
          _context2.next = 5;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 5:
          existedUser = _context2.sent;

          if (existedUser) {
            res.render("./user/signup", {
              title: "signup",
              errors: ["email alredy exist"]
            });
          }

          _context2.next = 9;
          return regeneratorRuntime.awrap(new User({
            name: name,
            email: email,
            password: password
          }).save());

        case 9:
          createdUser = _context2.sent;
          req.session.isAuth = true;
          res.redirect("profile");

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  });
};

module.exports.postSignin = function _callee3(req, res, next) {
  var result, errors, _req$body2, email, password, existedUser;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          result = validationResult(req);

          if (result.isEmpty()) {
            _context3.next = 4;
            break;
          }

          errors = result.errors.map(function (err) {
            return err.msg;
          });
          return _context3.abrupt("return", res.render("./user/signin", {
            title: "signin",
            errors: errors
          }));

        case 4:
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
          _context3.next = 7;
          return regeneratorRuntime.awrap(User.findOne({
            $and: [{
              email: email,
              password: password
            }]
          }));

        case 7:
          existedUser = _context3.sent;

          if (existedUser) {
            _context3.next = 10;
            break;
          }

          return _context3.abrupt("return", res.render("./user/signin", {
            title: "signin",
            errors: ["wrong email or password"]
          }));

        case 10:
          req.session.userId = existedUser._id;
          req.session.isAuth = true;
          res.redirect("profile");

        case 13:
        case "end":
          return _context3.stop();
      }
    }
  });
};