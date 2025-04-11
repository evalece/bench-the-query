
// GraphQL Server- as an API end point to access Redis in GraphQL Benchmark 
//from redis tutorial 

import Redis from 'ioredis'; //note: DB not here, this is IO 
import config from './config.js';
import { ApolloServer } from 'apollo-server';
import typeDefs from './schema.js';
import resolvers from './resolvers.js';
import graphQLrest from  './graphQLrest.js';

//for local; later: controlled by script
import { ApolloServerPluginLandingPageGraphQLPlayground } from '@apollo/server-plugin-landing-page-graphql-playground';



async function main() {

    let redis = new Redis(config.Redis_URL)
    let server = new ApolloServer({
        typeDefs,
        resolvers,
        introspection: true, 
        plugins: [ //for local; later: controlled by script
          ApolloServerPluginLandingPageGraphQLPlayground(),
        ],
        dataSources: () => ({
            graphQLrest: new graphQLrest(redis)
        }),
        context: () => ({}) 
            
    })

    let info= await server.listen({port: config.GraphQLPort}) 
    console.log(`GraphQL at ${info.url}`)
}

main().catch((err) => {
    console.error("GraphQL fail start: ", err);
});