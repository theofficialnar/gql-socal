const bcrypt = require('bcrypt');

const { User, Post } = require('../../models');

const posts = (parent, args, context, info) => Post.find({ userId: parent.id });

const user = (parent, args, context, info) => User.findById(args.id);

const addUser = async (parent, args, context, info) => {
  const {
    name,
    email,
    password,
    access,
  } = args;
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

const deleteUser = async (parent, args, context, info) => {
  let message = 'Error deleting user.';
  const userToRemove = await User.findById(args.id);
  if (await userToRemove.remove()) {
    message = 'User deleted.';
  }
  return message;
};

const loginUser = async (parent, args, context, info) => {
  const { email, password } = args;
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
    user,
  },
  Mutation: {
    addUser,
    deleteUser,
    loginUser,
  },
  User: {
    posts,
  },
};
