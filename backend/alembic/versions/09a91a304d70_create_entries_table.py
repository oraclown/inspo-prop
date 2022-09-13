"""create entries table

Revision ID: 09a91a304d70
Revises: 
Create Date: 2022-09-12 18:18:27.689208

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '09a91a304d70'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        "entries",
        sa.Column("id", sa.Integer, primary_key=True),
        sa.Column("user_id", sa.Integer),
        sa.Column("title", sa.String),
        sa.Column("description", sa.String),
        sa.Column("expiry", sa.Integer),
        sa.Column("created", sa.DateTime),
        sa.Column("status", sa.String),
        sa.Column("tags", sa.String),
        sa.Column("outcome", sa.String),
    )


def downgrade():
    op.drop_table("entries")