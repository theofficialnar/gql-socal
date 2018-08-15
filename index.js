require('./config');
const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const {
  typeDefs,
  resolvers,
} = require('./schema');

const { MONGODB_URI, JWT_SECRET } = process.env;

mongoose.connect(MONGODB_URI, { useNewUrlParser: true }).then(
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
  context: ({ req }) => {
    const token = req.headers.authorization || '';
    const user = jwt.verify(token, JWT_SECRET);
    return { user };
  },
});

server.listen().then(({ url }) => console.log(`Server running at ${url}`));
