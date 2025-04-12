#import  redis
# https://redis.readthedocs.io/en/stable/examples/connection_examples.html#Connecting-to-a-default-Redis-instance,-running-locally.
#
# redis_client = redis.Redis(host="localhost", port=6379, db=0)
#user_connection = redis.Redis(host='localhost', port=6380, decode_responses=True)
#user_connection.ping() 

# Then in your route
# @app.get("/get")
# async def get_redis():
#     value = await user_connection.get("mykey")
#     return {"value": value.decode() if value else None}

#(my mistakes above, will check back later)
# try to keep this a redis free zone, define only API endpoint routings 
from fastapi import APIRouter
from app.redis_client import get_user_session

router = APIRouter()

@router.get("/session/{user_id}")
async def fetch_session(user_id: str):
    session_data = get_user_session(user_id)
    return {"user_id": user_id, "session": session_data}

