module.exports = {
  Query: {
    getPost: (parent, { id }, context) => context.models.Post.getById(id),
    getPosts: (parent, args, context) => context.models.Post.getAll(),
  },
  Mutation: {
    createPost: (parent, { post }, context) => context.models.Post.create(post),
    updatePost: (parent, { id, post }, context) => context.models.Post.update(id, post),
    deletePost: (parent, { id }, context) => context.models.Post.delete(id),
  },
  Post: {
    user: ({ userId }, args, context) => context.models.User.getById(userId),
  },
};
