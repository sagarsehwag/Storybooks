const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    // after sucessfull authentication, redirect home
    res.redirect("/dashboard");
  }
);

module.exports = router;
