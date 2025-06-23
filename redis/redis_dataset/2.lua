local count = 0
local numUsers = tonumber(ARGV[1])
for i = 1, numUsers do
    redis.call('HSET', 'user:' .. i, 'v2000', string.rep('#', 2000))
    count = count + 1
end
return count

