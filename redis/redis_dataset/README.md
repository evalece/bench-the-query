

#### Testing Query of flat json of various length 
(To update: large payload batch parsing)

Everything inside this folder will be control by script later

## Simply copy and past lua script to redis_CLI


## Summary

# Lua workflow:
Multi-Line Lua recommended:

(1) Lua as an add on function 
Format: 
EVAL "<lua>" <numkeys> <key1> <key2> ... <keyN> 

(2) Passsing arguments to Lua script via scripts in .sh 
[args...]

(3) Why such design? Ref: https://redis.io/docs/latest/develop/interact/programmability/eval-intro/ 
Lua script should not access to modify key contents, key should be passed as arguments, hence, best practice:
"Script Only Access Keys Passed as Arguments "

Benchmark uses the following customizable string size as payload and is formatted as Redis Hash for Redis Clients.
`
Format:
"user":"1"
"3": "###" 
payload= [3,5,10,15,30,50,75,100,500,750,1000,1500,2000]
`


## Test Step

0. note: if benchmark in this path, client code need to upate Redis command to JSON.[Redis CLI]; hence use Lua insted
 https://redis.io/docs/latest/develop/interact/programmability/lua-api/
1.  Create Redis server to store data for query benchmark, assume wanting pre-existing dataset 
`Docker run -d --name redis -p 6370:6379  redis/redis-stack:latest`
2. Perform desired Lua Scripts (via RedisCLI, readily available in CLI). 



## Lua Script

The following Lua Script is to perform at Redis container:
Note: 
1. change n= number of desired existing test user(s).
2. redisC= container name
3. (optional): If already in Redis Cli, remove anything befoere EVAL:


Lua Script recommandations:
1. Use Hash so that API clients query fields by field name -- easier for bechmark comparison on API end 
2. Replace n below by desired exisiting user(s) data upon Redis Benchmark testing startup.

GPT assisted example: 
return count to validate write successfully 

To remove all keys in current databases (Cautions)
`FLUSHDB`

To remove chosen keys and databases (Cautions), assume "user:1,2,3..." as keys
`EVAL EVAL " local count = 0 for i = START, END do  count = count + redis.call('DEL', 'user:' .. i) end return count" 0`


Example, adding user:1 as key, "name": "user_1" as Redis Hash. Client Query useing field name: GET ""
# Customized Field and Field names
Side note: HSET key field value [field value ...] Ref: https://redis.io/docs/latest/commands/hset/ 
`EVAL "for i = 10, 13 do redis.call('HSET', 'user:' .. i, 'name', 'user_' .. i, 'age', tostring(20 + i)) end" 0`

# Quick Benchmark defualt keys and values :
format using Hash (Number of string): ##...### (Strings represented by #)
Example:
"user":"1" "3":"###"

Redis CLI:
HGET "user:1" "3" 
Redis: "###"

Replace testContent = {3,5,10,15,30,50,75,100,500,750}  With Desire Test count (for later, write in CLI)

`EVAL " local testContent = {3,5,10,15,30,50,75,100,500,750} local count = 0 for _, wordCount in ipairs(testContent) do for i = 1, 3 do redis.call('HSET', 'user:' .. i, 'v' .. tostring(wordCount), string.rep('#', wordCount)) count = count + 1 end end return count " 0`

(For Readability and Customize Editing:)

`
EVAL "local count = 0 local testContent={3,5,10,15,30,50,75,100, 500, 750}  
    for _, wordCount in ipairs(testContent) do 
        for i = 1, 3 do  redis.call('HSET', 'user:'..i, wordCount, string.rep('#', wordCount))
        end  
    end 
return count" 0 
`


# Additon note- Redis and Lua Limitation on Large importy
Loading the following seperately into Redis DB

`EVAL "for i = 1, 3 do redis.call('HSET', 'user:'..i, '2000', string.rep('#', 2000))end return count" 0 `

(If vis host, adding the following before EVAL), asssume we've already done 
`Docker run -d --name redis -p 6370:6379  redis/redis-stack:latest`
then 
`redis-cli -p 6370`




