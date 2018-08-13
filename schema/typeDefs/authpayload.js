const { gql } = require('apollo-server');

module.exports = gql`
  type AuthPayload {
    token: String
    user: User
  }
`;
