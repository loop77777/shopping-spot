const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/user");

router.get("/fake", async (req, res) => {
  const user = new User({ email: "sabeel@gmail.com", username: "sabeel" });
  const newUser = await User.register(user, "sabeel12");
  res.send(newUser);
});

//signupform
router.get("/register", async (req, res) => {
  res.render("auth/signup");
});
//registered
router.post("/register", async (req, res) => {
  try {
    const user = new User({
      username: req.body.username,
      email: req.body.email,
    });
    const newUser = await User.register(user, req.body.password);
    console.log(newUser);
    req.flash("success", "Registered Successfully");
    res.redirect("/products");
  } catch (error) {
    req.flash("error", error.message);
    res.redirect("/register");
  }
});

//loginform
router.get("/login", async (req, res) => {
  res.render("auth/login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  function (req, res) {
    req.flash("success", `Welcome Back! ${req.user.username}`);
    res.redirect("/products");
  }
);

router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success", "Logged Out Successfully!");
  res.redirect("/products");
});

module.exports = router;
