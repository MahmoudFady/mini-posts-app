const { check } = require("express-validator");

module.exports.signinValidation = [
  check("email")
    .not()
    .isEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email"),
  check("password")
    .not()
    .isEmpty()
    .withMessage("password is required")
    .isLength({ min: 6 })
    .withMessage("password must be more than 5 char"),
];
module.exports.signupValidation = [
  ...this.signinValidation,
  check("name")
    .not()
    .isEmpty()
    .withMessage("name is required")
    .isLength({ min: 3 })
    .withMessage("name must be more than 2 char"),
];
