// const { ApolloServer } = require('apollo-server');
// import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';


const Redis = require('ioredis');
const typeDefs = require('./schemas.js');
const resolvers = require('./resolvers.js');

const redis = new Redis({
  host: 'host.docker.internal',
  port: 6370 //for later: to change to docker env var later
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  plugins: [
    ApolloServerPluginLandingPageLocalDefault({ embed: true }) // to disable from remote sandbox 
  ],
  context: () => ({ redis })
});

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`GraphQL Redis Proxy ready at ${url}`);
});
