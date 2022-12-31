require("dotenv").config();
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongodbSessionStore = require("connect-mongodb-session")(session);
const morgan = require("morgan");
const csrf = require("csurf");
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const app = express();
app.set("views", "views");
app.set("view engine", "pug");
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "../", "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const sessionStore = new MongodbSessionStore({
  uri: process.env.MONGO_DB_URL,
});
app.use(
  session({
    secret: "secret word",
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
  })
);
const csrfProtection = csrf();
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_DB_URL)
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err.message);
  });
app.use(csrfProtection);

/// APP MAIN ROUTES
app.use((req, res, next) => {
  const token = req.csrfToken();
  res.locals.csrfToken = token;
  res.locals.isAuth = req.session.isAuth;
  next();
});
app.get("/", (req, res) => {
  res.redirect("/api/post");
});
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use((req, res, next) => {
  res.render("./page-not-found", {
    title: "page-not-found",
    msg: "page not found",
  });
});

module.exports = app;
