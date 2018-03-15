const env = require("dotenv").config();
const express = require("express");
const path = require("path");
const passport = require("passport");

const app = express();
app.use(passport.initialize());

const morgan = require("morgan");
app.use(morgan("combined"));

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);

//Add user schema
require("./models/User");
//const User = mongoose.model("User");

//auth routes
require("./routes/api/authentication.js")(app);
//user routes
require("./routes/api/user.js")(app);

//base dir
const rootDir = path.resolve(__dirname, "../");
//statics / client build
app.use("/", express.static(rootDir + "/client/build"));
//catch all
app.get("**", (req, res) => {
  res.sendFile(path.resolve(rootDir, "client", "build", "index.html"));
});

//start server
const port = process.env.PORT || "3000";
app.listen(port, () => {
  console.log("Server listening on port " + port);
});
