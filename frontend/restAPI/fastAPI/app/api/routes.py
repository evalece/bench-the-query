from fastapi import APIRouter, HTTPException
from redis_client import get_user_session

router = APIRouter()

@router.get("/session/{user_id}")
async def fetch_session(user_id: str):
    session_data = get_user_session(user_id)
    if not session_data:
        raise HTTPException(status_code=404, detail="Session not found")
    return {"user_id": user_id, "session": session_data}
