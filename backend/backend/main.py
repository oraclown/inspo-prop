import uvicorn
from fastapi import FastAPI

from backend.data import DEFAULT_DATA

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/default_data")
async def get_data():
    return {"message": DEFAULT_DATA}

def start():
    """Launched with `poetry run api` at root level"""
    uvicorn.run("backend.main:app", host="0.0.0.0", port=8000, reload=True)
