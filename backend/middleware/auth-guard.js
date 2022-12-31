module.exports = (req, res, next) => {
  const { isAuth, userId } = req.session;
  if (!isAuth && !userId) {
    res.redirect("/api/user/signin");
  }
  next();
};
