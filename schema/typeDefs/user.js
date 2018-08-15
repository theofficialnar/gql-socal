const { gql } = require('apollo-server');

module.exports = gql`
  type User {
    id: ID!,
    name: String!,
    email: String!,
    posts: [Post!]!
  }

  extend type Query {
    getUser(id: ID!): User
  }

  extend type Mutation {
    addUser(name: String!, email: String!, password: String!, access: String = "admin"): AuthPayload
    deleteUser(id: ID!): String
    loginUser(email: String!, password: String!): AuthPayload
  }
`;
