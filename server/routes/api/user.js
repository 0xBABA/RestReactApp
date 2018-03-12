const passport = require("passport");
require("../../authentication/jwt");

module.exports = app => {
  app.get(
    "/api/user/account",
    passport.authenticate(["jwt"], { session: false }),
    (req, res) => {
      res.json({ result: req.user });
    }
  );
};
