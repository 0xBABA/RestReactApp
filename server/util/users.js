// The actual database of users
const users = [
  {
    id: 0,
    name: "Graham",
    avatar:
      "https://www.fakepersongenerator.com/Face/male/male1085094556091.jpg",
    providers: []
  }
];

// Get a single user by their Internal ID
function getUserById(id) {
  return users.find(u => u.id == id);
}

// Get a single user by their External ID with a specified provider
function getUserByExternalId(provider, id) {
  return users.find(
    u => u.providers.findIndex(p => p.provider == provider && p.id == id) >= 0
  );
}

// Create a new user
function createUser(profile, provider, id) {
  const profileData = profile._json.items[0];
  const avatar = profileData.snippet.thumbnails.default.url;
  const name = profile.displayName;

  const user = {
    id: users.length,
    name: name,
    avatar: avatar,
    providers: [
      {
        provider: provider,
        id: id
      }
    ]
  };
  users.push(user);
  return user;
}

module.exports = {
  getUserById: getUserById,
  getUserByExternalId: getUserByExternalId,
  createUser: createUser
};
