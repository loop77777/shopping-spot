const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const Review = require("../models/review");
const { isLoggedIn } = require("../middleware");
// Display all the products
router.get("/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.render("products/index", { products });
  } catch (error) {
    console.log("Something Went Wrong!");

    req.flash("error", "Cannot Find Products");
    res.redirect("/error");
  }
});

// Get the form for new product
router.get("/products/new", isLoggedIn, (req, res) => {
  try {
    res.render("products/new");
  } catch (error) {
    console.log("Something Went Wrong!");

    req.flash("error", "Cannot Create Product");
    res.redirect("/error");
  }
});

// Create New Product
router.post("/products", isLoggedIn, async (req, res) => {
  try {
    await Product.create(req.body.product);
    req.flash("success", "Product Created Successfully!");
    res.redirect("/products");
  } catch (error) {
    console.log("Something Went Wrong!");

    req.flash("error", "Cannot Create Product");
    res.redirect("/error");
  }
});

// Show particular product
router.get("/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("reviews");

    res.render("products/show", { product });
  } catch (error) {
    console.log("Something Went Wrong!");
    req.flash("error", "Cannot Find Product");
    res.redirect("/error");
  }
});

// Get the edit form
router.get("/products/:id/edit", isLoggedIn, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.render("products/edit", { product });
  } catch (error) {
    console.log("Something Went Wrong!");

    req.flash("error", "Cannot Find Product");
    res.redirect("/error");
  }
});

// Upadate the particular product
router.patch("/products/:id", isLoggedIn, async (req, res) => {
  await Product.findByIdAndUpdate(req.params.id, req.body.product);
  req.flash("success", "Updates Created!");
  res.redirect(`/products/${req.params.id}`);
});

// Delete a particular product
router.delete("/products/:id", isLoggedIn, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.redirect("/products");
});

router.post("/products/:id/review", isLoggedIn, async (req, res) => {
  const product = await Product.findById(req.params.id);

  const review = new Review({
    user: req.user.username,
    ...req.body,
  });

  product.reviews.push(review);
  await review.save();
  await product.save();
  req.flash("success", "Successfully added your review!");
  res.redirect(`/products/${req.params.id}`);
});

router.get("/error", (req, res) => {
  res.status(500).render("error");
});

module.exports = router;
