const passport = require("passport");
//var refresh = require("passport-oauth2-refresh");
const YoutubeV3Strategy = require("passport-youtube-v3").Strategy;
const users = require("../util/users");

var strategy = new YoutubeV3Strategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  },
  async (accessToken, refreshToken, profile, done) => {
    let user = users.getUserByExternalId("youtube", profile.id);
    if (!user) {
      user = users.createUser(profile, "youtube", profile.id);
    }
    return done(null, user);
  }
);

passport.use(strategy); //end passport.use
