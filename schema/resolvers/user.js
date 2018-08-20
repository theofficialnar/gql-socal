module.exports = {
  Query: {
    getUser: (parent, { id }, context) => context.models.User.getById(id),
    getUsers: (parent, args, context) => context.models.User.getAll(),
  },
  Mutation: {
    createUser: (parent, { name, email, password, role }, context) => context.models.User.create(name, email, password, role),
    updateUser: (parent, { name, email, password }, context) => context.models.User.update(name, email, password),
    deleteUser: (parent, { id }, context) => context.models.User.delete(id),
    loginUser: (parent, { email, password }, context) => context.models.User.login(email, password),
  },
  User: {
    posts: ({ id }, args, context) => context.models.Post.getByAuthor(id),
  },
};
