const bcrypt = require(`bcrypt`);
const User = require(`../models/User`);
const { generate } = require(`../helpers/token`);
//const ROLES = require(`../constants/roles`);

async function register(login, password) {
  if (!password) {
    throw new Error(`Password is empty`);
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await User.create({ login, password: passwordHash });

  const token = generate({ id: user.id });

  return { user, token };
}

async function login(login, password) {
  const user = await User.findOne({ login }).populate("basket.product");
  await user.populate({ path: "basket.product", populate: "category" });

  if (!user) {
    throw Error(`User not found`);
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw Error(`Wrong password`);
  }

  const token = generate({ id: user.id });

  return { token, user };
}

async function getUser(id) {
  return await User.findById(id).populate("basket");
}

function updateUser(id, userData) {
  return User.findByIdAndUpdate(id, userData, { returnDocument: `after` });
}

// function getUsers() {
//   return User.find();
// }

// function deleteUser(id) {
//   return User.deleteOne({ _id: id });
// }

// function getRoles() {
//   return [
//     { id: ROLES.ADMIN, name: `Admin` },
//     { id: ROLES.USER, name: `User` },
//   ];
// }

module.exports = { register, login, getUser, updateUser };
