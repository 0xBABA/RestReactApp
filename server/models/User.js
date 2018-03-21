const mongoose = require("mongoose");
const { Schema } = mongoose;

/**
 * [userSchema description]
 *
 * @type {Schema}
 */
const userSchema = new Schema(
  {
    name: String,
    avatar: String,
    email: String,
    providers: []
  },
  {
    timestamps: true
  }
);

var User = mongoose.model("User", userSchema);

async function createUser(profile, provider, id) {
  const profileData = profile._json.items[0];
  const avatar = profileData.snippet.thumbnails.default.url;
  const name = profile.displayName;
  const email = "";

  return (user = await new User({
    name,
    avatar,
    email,
    providers: [
      {
        provider: provider,
        id: id
      }
    ]
  }).save());
}

//get a single usser by there external provider id
async function getUserByExternalId(provider, id) {
  return (user = await User.findOne({
    providers: { $elemMatch: { provider: provider, id: id } }
  }));
}

// Get a single user by their Internal ID
async function getUserById(id) {
  return (user = await User.findOne({
    _id: id
  }));
}

async function updateByUserId(id, fields) {
  return (user = await User.findOneAndUpdate(
    { _id: id },
    { $set: { ...fields } },
    { new: true }
  ));
}

module.exports = {
  User,
  createUser,
  getUserByExternalId,
  getUserById,
  updateByUserId
};

/*
account: {
  youtube: {
    youtubeId: String,
    accessToken: String,
    refreshToken: {
      type: String,
      default: ""
    }
  }
},
*/
