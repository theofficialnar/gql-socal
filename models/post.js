const mongoose = require('mongoose');
const User = require('./user');

const schema = new mongoose.Schema({
  post: {
    type: String,
    require: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}, {
  timestamps: true,
});

// Remove post id from User's posts array
// eslint-disable-next-line
schema.pre('remove', function(next) {
  const post = this;
  User.findById(post.userId, (err, user) => {
    // eslint-disable-next-line
    if (user.posts.pull(post._id)) {
      user.save();
      next();
    }
  });
});

module.exports = mongoose.model('Post', schema);
