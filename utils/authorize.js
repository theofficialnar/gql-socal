const { AuthenticationError } = require('apollo-server');

module.exports = (context) => {
  if (!context.user) {
    throw new AuthenticationError('You need to be logged in to do this.');
  }
};
