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
    addPost(post: String!): Post
    removePost(id: ID!): String
  }
`;
