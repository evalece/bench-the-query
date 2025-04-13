export default class testData {
    constructor(redis){ //redis io, 
        this.redis=redis
    }
    async fetchid(id){ //to change later 
        return this.redis.hgetall(`user:${id}`)
       }
}