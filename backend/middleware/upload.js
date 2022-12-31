const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./backend/uploads");
  },
  filename: (req, file, cb) => {
    const fileName = new Date().getTime() + file.originalname;
    cb(null, fileName);
  },
});
module.exports = multer({ storage });
