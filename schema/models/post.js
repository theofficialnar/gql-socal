const { AuthenticationError } = require('apollo-server');

const { Post, User } = require('../../models');
const authorize = require('../../utils/authorize');

module.exports = user => ({
  getAll: () => Post.find(),
  getById: id => Post.findById(id),
  getByAuthor: id => Post.find({ userId: id }),
  create: async (post) => {
    authorize(user);
    const { _id } = user;
    const newPost = new Post({
      post,
      userId: _id,
    });
    const posted = await newPost.save();
    if (!posted) {
      throw new Error('Unable to save post.');
    }
    const u = await User.findById(_id);
    u.posts.push(posted);
    u.save();
    return posted;
  },
  update: async (id, post) => {
    authorize(user);
    const updateQuery = {};
    if (post) {
      updateQuery.post = post;
    }
    const postToUpdate = await Post.findByIdAndUpdate(
      { _id: id, userId: user._id },
      { $set: updateQuery },
      { new: true },
    );
    if (!postToUpdate) {
      throw new Error('An error was encountered. Either the post is not yours or it does not exist.');
    }
    return postToUpdate;
  },
  delete: async (id) => {
    let result = '';
    authorize(user);
    const postToRemove = await Post.findById(id);
    if (!postToRemove) {
      throw new Error('Post does not exist.');
    } else if (postToRemove.userId.toString() !== user._id.toString()) {
      throw new AuthenticationError('You are not authorized to delete this post.');
    } else if (await postToRemove.remove()) {
      result = 'Post deleted.';
    }
    return result;
  },
});
