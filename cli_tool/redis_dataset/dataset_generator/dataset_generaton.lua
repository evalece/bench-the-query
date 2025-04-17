-- This Lua script is explained din README.md in the same dir, any script placed in here will be run automatically if
-- the CLI tool at root dir is called 


`EVAL " local testContent = {3,5,10,15,30,50,75,100,500,750} local count = 0 for _, wordCount in ipairs(testContent) do for i = 1, 10 do redis.call('HSET', 'user:' .. i, tostring(wordCount), string.rep('#', wordCount)) count = count + 1 end end return count " 0`
`EVAL "for i = 1, 3 do redis.call('HSET', 'user:'..i, '2000', string.rep('#', 2000))end return count" 0 `