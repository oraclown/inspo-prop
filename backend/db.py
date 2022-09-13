

# overall there's going to be one big table for all the entries
# each row in the table will have a unique id, title, description, expiry, created, status, tags, outcome

# another table will be for the users
# each row will have a unique id, username, password, email, created, last_login

import os
import databases
import sqlalchemy

from dotenv import load_dotenv


load_dotenv()

# DATABASE_URL = os.getenv("DATABASE_URL")

# database = databases.Database(DATABASE_URL)

database = databases.Database(f"postgresql://postgres:{os.getenv('DB_PASSWORD')}@localhost:5432/rejectr_db")

metadata = sqlalchemy.MetaData()

entries_table = sqlalchemy.Table(
    "entries",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("user_id", sqlalchemy.Integer),
    sqlalchemy.Column("title", sqlalchemy.String),
    sqlalchemy.Column("description", sqlalchemy.String),
    sqlalchemy.Column("expiry", sqlalchemy.Integer), # unix timestamp
    sqlalchemy.Column("created", sqlalchemy.Integer), # unix timestamp
    sqlalchemy.Column("status", sqlalchemy.String),
    sqlalchemy.Column("tags", sqlalchemy.String),
    sqlalchemy.Column("outcome", sqlalchemy.String),
)


engine = sqlalchemy.create_engine(
    # DATABASE_URL
    f"postgresql://postgres:{os.getenv('DB_PASSWORD')}@localhost:5432/rejectr_db"
)
# metadata.create_all(engine)
