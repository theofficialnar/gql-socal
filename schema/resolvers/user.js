const { User, Post } = require('../../models');
const bcrypt = require('bcrypt');

const posts = async (parent, args, context, info) => {
  return await Post.find({userId: parent.id});
}

const user = async (parent, args, context, info) => {
  return await User.findById(args.id);
}

const addUser = async (parent, args, context, info) => {
  let hashPass = await bcrypt.hash(args.password, 10);
  let newUser = new User({
    name: args.name,
    email: args.email,
    password: hashPass
  });
  return await newUser.save();
}

const deleteUser = async (parent, args, context, info) => {
  let userToRemove = await User.findById(args.id);
  if (await userToRemove.remove()) {
    let message = 'User deleted.';
    return message;
  }
}

module.exports = {
  Query: {
    user
  },
  Mutation: {
    addUser,
    deleteUser
  },
  User: {
    posts
  }
}
