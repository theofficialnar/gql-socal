const { gql } = require('apollo-server');

// Dummy base types to enable type extension
const base = gql`
  type Query {
    _: String
  }

  type Mutation {
    _: String
  }
`;

module.exports = [
  base,
  require('./user'),
  require('./post'),
  require('./authpayload'),
];
