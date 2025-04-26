local count = 0
for i, user in ipairs(KEYS) do
    redis.call('HSET', user, 'v2000', string.rep('#', 2000))
    count = count + 1
end
return count

