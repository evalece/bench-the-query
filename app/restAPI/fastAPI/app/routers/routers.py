from fastapi import APIRouter, HTTPException
from app.redis_client import get_user_session, get_user_fields
#from app.models import User 
from typing import Optional ### Allow link direct access: key/query_field1...n

#routers.py manages pagination

router = APIRouter()

# for multi-field+ flat schema + one API end point serve all:  
# do a direct link access

# ref: https://fastapi.tiangolo.com/tutorial/path-params/#create-an-enum-class 
#@router.get("/user/{user_id}/{User}") # **** watch how this filter impacts i.e., /user_id/field_1, field_2


# hardcoded or config-defined fields # ****for later, import from script settings 
#field_names = [f"var{v}" for v in [3, 5, 10, 15, 30, 50]] 

@router.get("/user/{user_id}")
async def fetch_user_all(user_id: str):
    if not get_user_session(user_id):
        raise HTTPException(status_code=404, detail="User not found")
    return get_user_session(f"user:{user_id}")  # returns full session data

##*** important learning: allow user to ask exactly what they wanted 
## simply put: dynamic routing 
@router.get("/user/{user_id}/{fields}")
async def fetch_user_fields(user_id: str, fields: str):
    if not get_user_session(user_id):
        raise HTTPException(status_code=404, detail="User not found")
    
    requested_fields = fields.split(" ") 
    
    session_data = get_user_fields(user_id, requested_fields)  # assume valid,  format: /user/{user_id}/ field1 field2 ... ### no nevermind 
    # redis's HMGET takes key field [fields] ANYWAYS 

    if not session_data:
        raise HTTPException(status_code=404, detail="No matching fields found")

    return {"user_id": user_id, "user": session_data}
