const Post = require("../../model/post");
const path = require("path");
const fs = require("fs");
module.exports.getAll = async (req, res, next) => {
  const pageSize = 5;
  let pageIndex = +req.query.pageIndex >= 1 ? +req.query.pageIndex : 1;
  const skip = (pageIndex - 1) * pageSize;
  const { isAuth, userId } = req.session;
  console.log(req.session.userId);
  const posts = await Post.find()
    .sort({ _id: -1 })
    .skip(skip)
    .limit(pageSize)
    .populate({ path: "creator" });
  pageIndex = posts.length == 0 ? 1 : pageIndex;
  const nextPageIndex = pageIndex + 1;
  const prevPageIndex = pageIndex > 1 ? pageIndex - 1 : null;
  res.render("index", {
    title: "post",
    isAuth,
    userId,
    posts,
    prevPageIndex,
    nextPageIndex,
  });
};
module.exports.getCreate = (req, res, next) => {
  const isAuth = req.session.isAuth;
  res.render("./post/create", { title: "create-post", isAuth });
};
module.exports.getEdit = async (req, res, next) => {
  const isAuth = req.session.isAuth;
  res.render("./post/edit", { title: "edit-post", isAuth });
};
module.exports.postCreate = async (req, res, next) => {
  const { userId } = req.session;
  let postData = {};
  postData.content = req.body.content;
  if (req.file) {
    postData.image =
      req.protocol + "://" + req.get("host") + "/uploads/" + req.file.filename;
  }
  const createdPost = await new Post({
    creator: userId,
    ...postData,
  }).save();
  const isAuth = req.session.isAuth;
  res.render("./post/create", { isAuth, successMsg: "post created" });
};
module.exports.deleteOne = async (req, res, next) => {
  const userId = req.session.userId;
  const isAuth = req.session.isAuth;
  try {
    const deletedPostImage = await Post.findByIdAndDelete({ creator: userId })
      .image;
    if (deletedPostImage) {
      const { base } = path.parse(deletedPostImage);
      fs.unlinkSync(path.join(__dirname, "../../", "uploads", base));
    }
    res.redirect("/post");
  } catch (err) {
    res.render("./page-not-found", {
      title: "error",
      msg: "something go wrong",
      isAuth,
    });
  }
};
