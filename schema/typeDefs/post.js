const { gql } = require('apollo-server');

module.exports = gql`
  type Post {
    id: ID!,
    post: String!,
    user: User!
  }

  extend type Query {
    getPost(id: ID!): Post,
    getPosts: [Post!]!
  }

  extend type Mutation {
    createPost(post: String!): Post
    deletePost(id: ID!): String
    updatePost(id: ID!, post: String!): Post
  }
`;
