const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../helpers/auth");

router.get("/", (req, res) => {
  res.render("stories/index");
});

router.get("/add", ensureAuthenticated, (req, res) => {
  res.render("stories/add");
});

module.exports = router;
