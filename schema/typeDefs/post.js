const { gql } = require('apollo-server');

module.exports = gql`
  type Post {
    id: ID!,
    post: String!,
    user: User!
  }

  extend type Query {
    post(id: ID!): Post,
    posts: [Post!]!
  }

  extend type Mutation {
    addPost(post: String!, userId: ID!): Post
    removePost(id: ID!): String
  }
`;
