import redis

r = redis.Redis(host='localhost', port=6380, decode_responses=True)

def get_user_session(userid: str) -> dict:
    return r.hgetall(f"user:{userid}")
     
