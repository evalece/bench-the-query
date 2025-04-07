
// GraphQL Server- as an API end point to access Redis in GraphQL Benchmark 
//from redis tutorial 

import Redis from 'ioredis'; //note: DB not here, this is IO 
import config from './config.js';
import { ApolloServer } from 'apollo-server';
import typeDefs from './schema.js'
import resolvers from './resolvers.js'
//6:68 one more check later

async function main() {

    let redis = new Redis(config.Redis_URL)
    let server = new ApoloServer({
        typeDefs,
        resolvers,
        dataSources: () => ({
            testData: new testData(redis)

        })
            
    })

    let info= await server.listen({port: config.PORT}) //
    console.log('ah ${info.url}')
}

main()