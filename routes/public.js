const express = require("express");
const router = express.Router();

//landing
router.get("/", (req, res) => {
    try {
        res.render("public/index");
    } catch (error) {
        req.flash("error", "Cannot Find You!");
        res.redirect("/error");
    }
 
});


module.exports = router;