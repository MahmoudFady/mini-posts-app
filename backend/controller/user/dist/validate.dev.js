"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var _require = require("express-validator"),
    check = _require.check;

module.exports.signinValidation = [check("email").not().isEmpty().withMessage("email is required").isEmail().withMessage("invalid email"), check("password").not().isEmpty().withMessage("password is required").isLength({
  min: 6
}).withMessage("password must be more than 5 char")];
module.exports.signupValidation = [].concat(_toConsumableArray((void 0).signinValidation), [check("name").not().isEmpty().withMessage("name is required").isLength({
  min: 3
}).withMessage("name must be more than 2 char")]);