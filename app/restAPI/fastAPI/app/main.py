from fastapi import FastAPI
from app.routers.routers import router
app = FastAPI()

@app.get("/")
def home():
    return {"msg": "FastAPI started."}
app.include_router(router)