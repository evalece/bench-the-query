### FastAPI & Unvcorn Server in REST API 


## Query:

format: localhost:8000/user/{user_id}/ field1 field2
example: localhost:8000/user/1/ v5 v15

## Unvicorn root
## PYTHONPATH=$(pwd) uvicorn main:app --reload 

## environment: 
1. Python3
2. pip3 install requirement.txt   <- check back later, to be automated 

# Reference

# important has extra tag
Redis + FastAPI https://redis.io/learn/develop/python/fastapi (important: bitcoint project guide)

API endpoint: https://fastapi.tiangolo.com/tutorial/path-operation-configuration/#response-status-code 

Custom types: https://fastapi.tiangolo.com/advanced/custom-response/#use-orjsonresponse 

customized Response: https://fastapi.tiangolo.com/advanced/custom-response/#response 

Pydantic model to return only response of pre-defined type: https://fastapi.tiangolo.com/advanced/response-directly/#returning-a-custom-response  

Mounting and/ or subquery (with or without having user input again?) https://fastapi.tiangolo.com/advanced/sub-applications/#sub-application <- check back if redirection needed?



-------------------


Redis Client in Python: https://redis.io/docs/latest/develop/clients/redis-py/connect/
 