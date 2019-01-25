// requiring the necessary packages
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const passport = require("passport");
const passportConfig = require("./config/passport")(passport);

// local routes
const auth = require("./routes/auth");

const app = express();

// body-parser middleware
app.use(
  express.urlencoded({
    extended: true
  })
);
app.use(express.json());

// serving static files
app.use(express.static(path.join(__dirname, "public")));

// all the routing code will be here
app.get("/", (req, res) => {
  res.send("It Works");
});

// use routes
app.use("/auth", auth);

// server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server Started ${port}`);
});
