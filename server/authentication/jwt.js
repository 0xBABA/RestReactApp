const passport = require("passport");
const passportJwt = require("passport-jwt");
const users = require("../util/users");

const jwtOptions = {
  jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeader(),
  secretOrKey: process.env.JWT_SIGNING_KEY,
  issuer: process.env.JWT_ISSUER,
  audience: process.env.JWT_AUDIENCE
};

passport.use(
  new passportJwt.Strategy(jwtOptions, (payload, done) => {
    const user = users.getUserById(parseInt(payload.sub));
    if (user) {
      return done(null, user, payload);
    }
    return done();
  })
);
