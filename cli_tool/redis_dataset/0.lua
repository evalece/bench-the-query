local testContent = {3,5,10,15,30,50,75,100,500,750}
local numUsers = tonumber(ARGV[1])
local count = 0

for _, wordCount in ipairs(testContent) do
  for i = 1, numUsers do
    redis.call('HSET', 'user:' .. i, 'v' .. tostring(wordCount), string.rep('#', wordCount))
    count = count + 1
  end
end

return count
