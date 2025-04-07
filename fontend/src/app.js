import Redis from 'ioredis';
import config from './config.js';
//from redis tutorial 
async function main() {

    let redis = new Redis(config.Redis_URL)
    let server = new ApoloServer({
        typeDefs,
        resolvers,
        dataSources: () => ({
            testData: new testData(redis)

        })
            
    })

    let info= await server.listen({port: config.PORT})
    console.log('ah ${info.url}')
}