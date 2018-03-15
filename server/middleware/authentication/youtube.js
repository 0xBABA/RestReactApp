const passport = require("passport");
const YoutubeV3Strategy = require("passport-youtube-v3").Strategy;
const User = require("../../models/User");

var strategy = new YoutubeV3Strategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  },
  async (accessToken, refreshToken, profile, done) => {
    let user = await User.getUserByExternalId("youtube", profile.id);
    if (!user) {
      user = await User.createUser(profile, "youtube", profile.id);
    }
    return done(null, user);
  }
);

passport.use(strategy); //end passport.use
