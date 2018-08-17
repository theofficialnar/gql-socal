require('./config');
const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const { typeDefs, resolvers } = require('./schema');
const getUser = require('./utils/getUser');
const generateUserModels = require('./schema/models/user');
const generatePostModels = require('./schema/models/post');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }).then(
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
  context: async ({ req }) => {
    const token = req.headers.authorization || '';
    const user = await getUser(token);
    return {
      user,
      models: {
        User: generateUserModels(),
        Post: generatePostModels(user),
      },
    };
  },
});

server.listen().then(({ url }) => console.log(`Server running at ${url}`));
