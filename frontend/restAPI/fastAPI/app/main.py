from fastapi import FastAPI
from api.routes import router as session_router
app = FastAPI()

@app.get("/")
def home():
    return {"msg": "FastAPI on!"}
app.include_router(session_router)