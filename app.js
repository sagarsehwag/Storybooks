// requiring the necessary packages
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

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

// server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server Started ${port}`);
});
