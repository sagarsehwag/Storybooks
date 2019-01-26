// requiring the necessary packages
const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");

// load User model
require("./models/User");
require("./models/Story");

// load passport configuration
require("./config/passport")(passport);

// load routes
const index = require("./routes/index");
const stories = require("./routes/stories");
const auth = require("./routes/auth");

// load keys
const keys = require("./config/keys");

// map global promise
mongoose.Promise = global.Promise;

// mongoose connect
mongoose
  .connect(keys.mongoURI)
  .then(() => {
    console.log("MongoDB Connected via Mongoose");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

// body-parser middleware
app.use(
  express.urlencoded({
    extended: true
  })
);
app.use(express.json());

// method-override middleware
app.use(methodOverride("_method"));

// serving static files
app.use(express.static(path.join(__dirname, "public")));

// express session middleware
app.use(cookieParser());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false
    // cookie: { secure: true }
  })
);

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// set global variables
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

// handlebars helper
const {
  truncate,
  stripTags,
  formatDate,
  select
} = require("./helpers/hbs")

// handlebars middleware
app.engine(
  "handlebars",
  exphbs({
    helpers: {
      truncate: truncate,
      stripTags: stripTags,
      formatDate: formatDate,
      select: select
    },
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// use routes
app.use("/", index);
app.use("/stories", stories);
app.use("/auth", auth);

// server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server Started ${port}`);
});