const { validationResult } = require("express-validator");
const User = require("../../model/user");
module.exports.getProfile = async (req, res, next) => {
  const userId = req.session.userId;
  const user = await User.findById(userId);
  console.log(user);
  res.render("./user/profile", {
    user,
    isAuth: true,
  });
};
module.exports.getSignup = (req, res, next) => {
  const isAuth = req.session.isAuth;
  res.render("./user/signup", { title: "signup", isAuth });
};
module.exports.getSignin = (req, res, next) => {
  const isAuth = req.session.isAuth;
  res.render("./user/signin", { title: "signin", isAuth });
};
module.exports.postSingnup = async (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const errors = result.errors.map((err) => err.msg);
    res.render("./user/signup", { title: "signup", errors });
  }
  const { name, email, password } = req.body;
  const existedUser = await User.findOne({ email });
  if (existedUser) {
    res.render("./user/signup", {
      title: "signup",
      errors: ["email alredy exist"],
    });
  }
  const { _id } = await new User({ name, email, password }).save();
  req.session.userId = _id;
  req.session.isAuth = true;
  res.redirect("profile");
};
module.exports.postSignin = async (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const errors = result.errors.map((err) => err.msg);
    return res.render("./user/signin", { title: "signin", errors });
  }
  const { email, password } = req.body;
  const existedUser = await User.findOne({ $and: [{ email, password }] });
  if (!existedUser) {
    return res.render("./user/signin", {
      title: "signin",
      errors: ["wrong email or password"],
    });
  }
  const { _id } = existedUser;
  req.session.userId = _id;
  req.session.isAuth = true;
  res.redirect("profile");
};
