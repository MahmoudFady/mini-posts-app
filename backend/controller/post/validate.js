const { check } = require("express-validator");

module.exports.createPostValidation = [
  check("content").not().isEmpty().withMessage("post content is required"),
];
