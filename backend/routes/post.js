const express = require("express");
const router = express.Router();
const {
  getCreate,
  getEdit,
  postCreate,
  getAll,
} = require("../controller/post/post");
const authGuard = require("../middleware/auth-guard");
const upload = require("../middleware/upload");
router.get("/", getAll);
router.get("/create", authGuard, getCreate);

router.get("/edit", authGuard, getEdit);
router.post("/create", upload.single("postImage"), authGuard, postCreate);

module.exports = router;
