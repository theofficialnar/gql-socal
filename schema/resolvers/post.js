const { AuthenticationError } = require('apollo-server');
const { Post, User } = require('../../models');

const userInfo = parent => User.findById(parent.userId);

const getPost = (_, { id }) => Post.findById(id);

const getPosts = () => Post.find();

const addPost = async (_, { post }, context) => {
  if (!context.user.id) {
    throw new AuthenticationError('You need to be logged in to do this.');
  }
  const { id } = context.user;
  const user = await User.findById(id);
  const newPost = new Post({
    post,
    userId: id,
  });
  const posted = await newPost.save();
  if (!posted) {
    throw new Error('Unable to save post.');
  }
  user.posts.push(posted);
  user.save();
  return posted;
};

const removePost = async (parent, args, context, info) => {
  const postToRemove = await Post.findById(args.id);
  if (await postToRemove.remove()) {
    const message = 'Post deleted.';
    return message;
  }
};

module.exports = {
  Query: {
    getPost,
    getPosts,
  },
  Mutation: {
    addPost,
    removePost,
  },
  Post: {
    user: userInfo,
  },
};
