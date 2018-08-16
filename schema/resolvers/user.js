const { Post } = require('../../models');

module.exports = {
  Query: {
    getUser: (parent, { id }, context) => context.models.User.getById(id),
    getUsers: (parent, args, context) => context.models.User.getAll(),
  },
  Mutation: {
    createUser: (parent, {
      name,
      email,
      password,
      role,
    }, context) => context.models.User.create(name, email, password, role),
    removeUser: (parent, { id }, context) => context.models.User.remove(id),
    loginUser: (parent, { email, password }, context) => context.models.User.login(email, password),
  },
  User: {
    posts: parent => Post.find({ userId: parent.id }),
  },
};
