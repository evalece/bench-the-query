# https://redis.readthedocs.io/en/stable/examples/connection_examples.html#Connecting-to-a-default-Redis-instance,-running-locally.
#
# redis_client = redis.Redis(host="localhost", port=6379, db=0)


user_connection = redis.Redis(host='localhost', port=6380, decode_responses=True)
user_connection.ping()

#r.hgetall('user-session:123')