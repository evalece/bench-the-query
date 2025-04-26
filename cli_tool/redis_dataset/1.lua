local count = 0
for i, user in ipairs(KEYS) do
    redis.call('HSET', user, 'v1500', string.rep('#', 1500))
    count = count + 1
end
return count
