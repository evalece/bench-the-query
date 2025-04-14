import redis

r = redis.Redis(
    host='localhost',  # or 'your-redis-host'
    port=6370,
    decode_responses=True  # Optional: returns strings instead of bytes
)
