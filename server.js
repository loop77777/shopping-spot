const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
// const cookieParser = require("cookie-parser");
//const seedDB = require("./seed");
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");
require("dotenv").config();
// Routes
const productRoutes = require("./routes/product");
const authRoutes = require("./routes/auth");
const cartRoutes = require("./routes/cart");
const paymentsRoutes = require("./routes/payment");

mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DataBase Connected");
  })
  .catch((err) => {
    console.log("DataBase Error!!!");
    console.log(err);
  });

// seedDB();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

const sessionConfig = {
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  
};

app.use(session(sessionConfig));
app.use(flash());

// initialising passport and sessions
app.use(passport.initialize());
app.use(passport.session());

//config passport to use LocalStrategy
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currentUser = req.user;
  next();
});

// app.get("/", (req, res) => {
//   res.render("public");
// });

app.use(productRoutes);
app.use(authRoutes);
app.use(cartRoutes);
app.use(paymentsRoutes);

// app.use(cookieParser());

app.listen(process.env.PORT || 3000, () => {
  console.log("Server Started...");
});
