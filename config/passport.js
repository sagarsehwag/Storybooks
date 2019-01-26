const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("./keys");

// load user model
const User = mongoose.model("User");

module.exports = (passport) => {
  passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: "/auth/google/callback",
        proxy: true
      },
      (accessToken, refreshToken, profile, done) => {
        const image = profile.photos[0].value.substring(0, profile.photos[0].value.indexOf("?"));

        const newUser = {
          googleID: profile.id,
          email: profile.emails[0].value,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          image: image
        };

        // check for existing user
        User.findOne({
          googleID: profile.id
        }).then((user) => {
          if (user) {
            // return user
            done(null, user);
          } else {
            // create user
            new User(newUser)
              .save()
              .then((user) => done(null, user));
          }
        });
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
      done(null, user);
    });
  });
};