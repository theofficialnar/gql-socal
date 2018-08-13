const { Post, User } = require('../../models');

const userInfo = async (parent, args, context, info) => {
  return await User.findById(parent.userId);
}

const post = async (parent, args, context, info) => {
  return await Post.findById(args.id);
}

const posts = async (parent, args, context, info) => {
  return await Post.find();
}

const addPost = async (parent, args, context, info) => {
  let user = await User.findById(args.userId);
  let newPost = new Post({
    post: args.post,
    userId: args.userId
  });
  let post = await newPost.save();
  user.posts.push(post);
  user.save();
  return post;
}

const removePost = async (parent, args, context, info) => {
  let postToRemove = await Post.findById(args.id);
  if (await postToRemove.remove()) {
    let message = 'Post deleted.';
    return message;
  }
}

module.exports = {
  Query: {
    post,
    posts
  },
  Mutation: {
    addPost,
    removePost,
  },
  Post: {
    user: userInfo
  }
}
