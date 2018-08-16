const { AuthenticationError } = require('apollo-server');
const { Post, User } = require('../../models');

const userInfo = parent => User.findById(parent.userId);

const getPost = (_, { id }) => Post.findById(id);

const getPosts = () => Post.find();

const addPost = async (_, { post }, context) => {
  if (!context.user) {
    throw new AuthenticationError('You need to be logged in to do this.');
  }
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
  if (!context.user) {
    throw new AuthenticationError('You need to be logged in to do this.');
  }
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
