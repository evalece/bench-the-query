// const { ApolloServer } = require('apollo-server');
// import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
// import static java.lang.System.getenv; use process.env. in TS

const Redis = require('ioredis');
const typeDefs = require('./schemas.js');
const resolvers = require('./resolvers.js');

const redis = new Redis({ // client server containing Redis to forward RESP message to upstream, assuming client server sends to proxy then to redis 
  host: 'host.docker.internal',
  port: 6370 
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
