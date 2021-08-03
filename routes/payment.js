const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middleware");
const Product = require("../models/product");
const User = require("../models/user");

router.get("/user/:userId/cart/payment", isLoggedIn, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate("cart");
    res.render("payments/payment", { userCart: user.cart });
  } catch (error) {
    req.flash("error", "Unable to proceed!");
    res.render("error");
  }
});
module.exports = router;
