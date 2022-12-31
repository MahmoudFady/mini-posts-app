module.exports = (req, res, next) => {
  const { isAuth, userId } = req.session;
  if (isAuth && userId) {
    return res.redirect("/api/user/profile");
  }
  next();
};
