const passport = require("passport");

//require("../../authentication/google");
require("../../authentication/youtube");
const token = require("../../util/token");

// Generate the Token for the user authenticated in the request
// send that token as a cookie back to main app
function generateUserToken(req, res, next) {
  const accessToken = token.generateAccessToken(req.user.id);
  //set expire time 1 minute from now
  var date = new Date();
  date.setTime(date.getTime() + 60 * 1000);
  res.cookie("jwt", accessToken, { expire: date });

  if (process.env.NODE_ENV == "development") {
    //
    //FOR REACT CLIENT SERVED OUT OF WEBPACK
    //
    res.redirect("http://localhost:" + 3001 + "/account");
  } else {
    //redirect to homepage or uesr page soon
    res.redirect("/account");
  }
}

module.exports = app => {
  app.get(
    "/api/auth/youtube/start",
    passport.authenticate("youtube", {
      scope: [
        "https://www.googleapis.com/auth/youtube.readonly",
        "profile",
        "email"
      ],
      authorizationParams: {
        accessType: "offline",
        approvalPrompt: "auto"
      }
    })
  );

  app.get(
    "/api/auth/youtube/redirect",
    passport.authenticate("youtube", { session: false }),
    generateUserToken
  );
};
