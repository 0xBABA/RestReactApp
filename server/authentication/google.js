const passport = require("passport");
const passportGoogle = require("passport-google-oauth");
const users = require("../util/users");

const passportConfig = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL
};

if (passportConfig.clientID) {
  passport.use(
    new passportGoogle.OAuth2Strategy(passportConfig, function(
      request,
      accessToken,
      refreshToken,
      profile,
      done
    ) {
      let user = users.getUserByExternalId("google", profile.id);
      if (!user) {
        user = users.createUser(profile, "google", profile.id);
      }
      return done(null, user);
    })
  );
}
