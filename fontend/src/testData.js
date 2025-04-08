export default class testData {
    constructor(redis){ //redis io, 
        this.redis=redis
    }
    async fetchState(state){ //to change later 
        return this.redis.hgetall(`state: ${state}`)
       }
}