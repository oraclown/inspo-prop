Setup:

    python -m venv venv
    . venv/bin/activate
    pip install -r requirements.txt

Run the development server:

    uvicorn main:app --reload

For db migrations:
```
Make sure you’re in the root of the API directory and run the command: alembic upgrade head

If you connect to the database you’ll now be able to see the two created tables, and the relationship between them.

If you want to undo the migration, you can run the command: alembic downgrade -1
This will undo the last migration applied.
If instead you have multiple migrations and you want to undo a specific one, you need to find the id of the migration by running alembic history. Grab the id, and then use the command alembic downgrade <MIGRATION_ID>.
```
Thx [source](https://ianrufus.com/blog/2020/12/sqlalchemy-alembic-migrations/)