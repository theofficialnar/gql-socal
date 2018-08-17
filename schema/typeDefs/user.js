const { gql } = require('apollo-server');

module.exports = gql`
  type User {
    id: ID!,
    name: String!,
    email: String!,
    posts: [Post!]!
  }

  extend type Query {
    getUser(id: ID!): User,
    getUsers: [User!]!
  }

  extend type Mutation {
    createUser(name: String!, email: String!, password: String!, role: String = "admin"): AuthPayload
    deleteUser(id: ID!): String
    loginUser(email: String!, password: String!): AuthPayload
  }
`;
