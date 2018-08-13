const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const { typeDefs, resolvers } = require('./schema');

mongoose.connect('mongodb://localhost:27017/gql-playground', { useNewUrlParser: true }).then(
  () => console.log('MongoDB connection successful.'),
  err => console.error(err),
);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: {
    settings: {
      'editor.cursorShape': 'block',
    },
  },
  // context: ({ req }) => {
  //   const token = req.headers.authorization || '';
  //   // eslint-disable-next-line
  //   const user = getUser(token);
  //   return { user };
  // },
});

server.listen().then(({ url }) => console.log(`Server running at ${url}`));
