import redis
#redis_client.py is redis client 
#similar to resolvers.js
# for simplicity, only check non-200s, hence, get_user_fields is not parsed
# need to test pydanmic for parsing *** later
import os

# connect to localhost first in image build 
r = redis.Redis(host=os.getenv("REDIS_HOST"), port=os.getenv("REDIS_PORT"), decode_responses=True) ###** later: control by docker env var + script

def get_user_session(userid: str) -> int:
    return r.exists(f"user:{userid}")



def  get_user_fields(userid: str, field_names: list) -> str: 
   
    return r.hmget(f"user:{userid}", field_names) 