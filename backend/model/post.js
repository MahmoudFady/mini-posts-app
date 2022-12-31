const mongoose = require("mongoose");
const postSchema = new mongoose.Schema(
  {
    creator: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
    },
  },
  { strict: false }
);
module.exports = mongoose.model("Post", postSchema);
