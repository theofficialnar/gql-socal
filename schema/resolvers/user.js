const bcrypt = require('bcrypt');

const { User, Post } = require('../../models');

const getPosts = parent => Post.find({ userId: parent.id });

const getUser = (_, { id }) => User.findById(id);

const addUser = async (_, { name, email, password, access }) => {
  const hashPass = await bcrypt.hash(password, 10);
  const userNew = new User({
    name,
    email,
    password: hashPass,
    access,
  });
  await userNew.save();
  const token = await userNew.generateToken();
  return {
    token,
    user: userNew,
  };
};

const deleteUser = async (_, { id }) => {
  let message = '';
  const userToRemove = await User.findById(id);
  if (!userToRemove) {
    throw new Error('User does not exist.');
  }
  if (await userToRemove.remove()) {
    message = 'User deleted.';
  }
  return message;
};

const loginUser = async (_, { email, password }) => {
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
};

module.exports = {
  Query: {
    getUser,
  },
  Mutation: {
    addUser,
    deleteUser,
    loginUser,
  },
  User: {
    posts: getPosts,
  },
};
