const { gql } = require('apollo-server');

module.exports = gql`
  type User {
    id: ID!,
    name: String!,
    email: String!,
    posts: [Post!]!
  }

  extend type Query {
    user(id: ID!): User
  }

  extend type Mutation {
    addUser(name: String!, email: String!, password: String!): User
    deleteUser(id: ID!): String
  }
`;
