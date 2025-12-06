import User from "./models/userModel.js";

export async function createUser(userData) {
  const user = new User(userData);
  return await user.save();
}

export async function getUserByEmail(email) {
  return await User.findOne({ email });
}

export async function getUserByUsername(username) {
  return await User.findOne({ username });
}

export async function getUserById(id) {
  return await User.findById(id).select("-password");
}
