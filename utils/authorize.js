const { AuthenticationError } = require('apollo-server');

module.exports = (user) => {
  if (!user) {
    throw new AuthenticationError('You need to be logged in to do this.');
  }
};
