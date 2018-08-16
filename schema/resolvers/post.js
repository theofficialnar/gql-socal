const { AuthenticationError } = require('apollo-server');

const { Post, User } = require('../../models');
const authorize = require('../../utils/authorize');

const userInfo = parent => User.findById(parent.userId);

const getPost = (_, { id }) => Post.findById(id);

const getPosts = () => Post.find();

const addPost = async (_, { post }, context) => {
  authorize(context);
  const { _id } = context.user;
  const user = await User.findById(_id);
  const newPost = new Post({
    post,
    userId: _id,
  });
  const posted = await newPost.save();
  if (!posted) {
    throw new Error('Unable to save post.');
  }
  user.posts.push(posted);
  user.save();
  return posted;
};

const removePost = async (_, { id }, context) => {
  let message = '';
  authorize(context);
  const postToRemove = await Post.findById(id);
  if (!postToRemove) {
    throw new Error('Post does not exist.');
  } else if (postToRemove.userId.toString() !== context.user._id.toString()) {
    throw new AuthenticationError('You are not authorized to delete this post.');
  } else if (await postToRemove.remove()) {
    message = 'Post deleted.';
  }
  return message;
};

const updatePost = (_, { post, id }, context) => {
  authorize(context);
};

module.exports = {
  Query: {
    getPost,
    getPosts,
  },
  Mutation: {
    addPost,
    removePost,
    updatePost,
  },
  Post: {
    user: userInfo,
  },
};
