const { ApolloServer } = require('apollo-server');


const Redis = require('ioredis');
const typeDefs = require('./schemas.js');
const resolvers = require('./resolvers.js');

const redis = new Redis({
  host: 'host.docker.internal',
  port: 6370 //
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({ redis })
});

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`GraphQL Redis Proxy ready at ${url}`);
});
