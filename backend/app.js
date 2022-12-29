require("dotenv").config();
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const app = express();
app.set("views", "views");
app.set("view engine", "pug");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "../", "public")));
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_DB_URL)
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err.message);
  });
/// APP MAIN ROUTES
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);

module.exports = app;
