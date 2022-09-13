import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from data import DEFAULT_DATA

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

PLACEHOLDER_DATABASE = DEFAULT_DATA

@app.get("/")
async def root():
    return {"message": "sup boi"}

@app.get("/default_data")
async def get_data():
    print("someone called get_data")
    return {"message": PLACEHOLDER_DATABASE}

# # add entry to placeholder databases data
# @app.post("/default_data")
# async def add_data():
#     return {"message": PLACEHOLDER_DATABASE}

# # update entry in placeholder databases data
# @app.put("/default_data")
# async def update_data():
#     return {"message": PLACEHOLDER_DATABASE}

# # delete entry in placeholder databases data
# @app.delete("/default_data")
# async def delete_data():
#     return {"message": PLACEHOLDER_DATABASE}
