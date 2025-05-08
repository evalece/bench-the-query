local numUsers = tonumber(ARGV[1])
local wordCount = cjson.decode(ARGV[2])  -- GPT assisted;  ← this is how you use STRING_SIZES from .env; default: ${STRING_SIZES:-3,5,10,15,30,50,75,100,500,750,1000,2000}


local count = 0

for _, wordCount in ipairs(testContent) do
  for i = 1, numUsers do
    redis.call('HSET', 'user:' .. i, 'v' .. wordCount, string.rep('#', tonumber(wordCount)))
    count = count + 1
  end
end

return count
