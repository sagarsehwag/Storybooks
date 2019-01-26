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
  passport.authenticate("google", {
    failureRedirect: "/"
  }),
  (req, res) => {
    // after sucessfull authentication, redirect home
    res.redirect("/dashboard");
  }
);

router.get("/verify", (req, res) => {
  // console.log(req.user);
  if (req.user) {
    console.log(req.user);
    res.send("User Is Authenticated");
  } else {
    console.log("Not Authenticated");
  }
});

router.get("/logout", (req, res) => {
  req.logOut();
  res.redirect("/");
});

module.exports = router;