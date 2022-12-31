"use strict";

require("dotenv").config();

var path = require("path");

var express = require("express");

var mongoose = require("mongoose");

var session = require("express-session");

var MongodbSessionStore = require("connect-mongodb-session")(session);

var morgan = require("morgan");

var userRoutes = require("./routes/user");

var postRoutes = require("./routes/post");

var app = express();
app.set("views", "views");
app.set("view engine", "pug");
app.use(morgan("dev"));
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
app.use("/public", express["static"](path.join(__dirname, "../", "public")));
var sessionStore = new MongodbSessionStore({
  uri: process.env.MONGO_DB_URL
});
app.use(session({
  secret: "secret word",
  resave: false,
  saveUninitialized: false,
  store: sessionStore
}));
mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGO_DB_URL).then(function () {
  console.log("connected to db");
})["catch"](function (err) {
  console.log(err.message);
}); /// APP MAIN ROUTES

app.get("/", function (req, res) {
  res.redirect("/api/post");
});
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use(function (req, res, next) {
  res.render("./page-not-found");
});
module.exports = app;