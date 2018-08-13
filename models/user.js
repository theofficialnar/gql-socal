const mongoose = require('mongoose');
const { ObjectID } = require('mongodb');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
  }],
}, {
  timestamps: true,
  usePushEach: true,
});

// eslint-disable-next-line
schema.pre('remove', function(next) {
  const Post = require('./post');
  const user = this;
  user.posts.forEach((item) => {
    Post.findByIdAndRemove(new ObjectID(item), () => {});
  });
  next();
});

module.exports = mongoose.model('User', schema);
