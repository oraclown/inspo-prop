from data import EntryOut
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from data import DEFAULT_DATA, EntryIn, EntryOut, UserIn, UserOut
from db import database, entries_table

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

@app.on_event("startup")
async def startup():
    await database.connect()


@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()


# PLACEHOLDER_DATABASE = DEFAULT_DATA


@app.get("/")
async def root():
    return {"message": "sup boi"}


@app.get("/entries/", response_model=list[EntryOut])
async def read_entries():
    query = entries_table.select()
    return await database.fetch_all(query)


@app.post("/entries/", response_model=EntryIn)
async def create_entry(entry: EntryIn):
    print(entry)
    query = entries_table.insert().values(
        user_id=entry.user_id,
        title=entry.title,
        description=entry.description,
        expiry=entry.expiry,
        created=entry.created,
        status=entry.status,
        tags=entry.tags,
        outcome=entry.outcome,
    )
    last_record_id = await database.execute(query)
    return {**entry.dict(), "id": last_record_id}


@app.delete("/entries/")
async def delete_entries():
    query = entries_table.delete()
    await database.execute(query)
    return {"message": "All entries deleted"}

