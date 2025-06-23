local count = 0
local numUsers = tonumber(ARGV[1])
for i = 1, numUsers do
    redis.call('HSET', 'user:' .. i, 'v1500', string.rep('#', 1500))
    count = count + 1
end
return count
