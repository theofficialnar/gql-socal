const bcrypt = require('bcrypt');
const { AuthenticationError } = require('apollo-server');

const { User } = require('../../models');
const authorize = require('../../utils/authorize');

module.exports = user => ({
  getAll: () => User.find(),
  getById: id => User.findById(id),
  create: async (name, email, password, role) => {
    const hashPass = await bcrypt.hash(password, 10);
    const userNew = new User({
      name,
      email,
      password: hashPass,
      role,
    });
    await userNew.save();
    const token = await userNew.generateToken();
    return {
      token,
      user: userNew,
    };
  },
  update: async (name, email, password) => {
    authorize(user);
    const updateQuery = {};
    if (name) {
      updateQuery.name = name;
    }
    if (email) {
      updateQuery.email = email;
    }
    if (password) {
      updateQuery.password = await bcrypt.hash(password, 10);
    }
    const userToUpdate = await User.findByIdAndUpdate(
      { _id: user._id },
      { $set: updateQuery },
      { new: true },
    );
    if (!userToUpdate) {
      throw new Error('User does not exist.');
    }
    return userToUpdate;
  },
  delete: async (id) => {
    let message = '';
    const userToRemove = await User.findById(id);
    if (!userToRemove) {
      throw new Error('User does not exist.');
    }
    if (await userToRemove.remove()) {
      message = 'User deleted.';
    }
    return message;
  },
  login: async (email, password) => {
    const userLogin = await User.findOne({ email }, (err, res) => {
      if (res) return res;
    });
    if (!userLogin) {
      throw new Error('User does not exist.');
    }
    const validate = await bcrypt.compare(password, userLogin.password);
    if (!validate) {
      throw new Error('Incorrect password');
    }
    const token = await userLogin.generateToken();
    return {
      token,
      user: userLogin,
    };
  },
});
