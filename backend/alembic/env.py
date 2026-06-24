from logging.config import fileConfig
import os
import sys
from pathlib import Path

from alembic import context
from dotenv import load_dotenv
from sqlalchemy import engine_from_config, pool

# =========================================
# EN: Make backend/app imports available to Alembic
# JP: Alembic から backend/app の import を使えるようにします
# =========================================

BASE_DIR = Path(__file__).resolve().parents[1]
sys.path.append(str(BASE_DIR))

# =========================================
# EN: Load backend/.env
# JP: backend/.env を読み込みます
# =========================================

load_dotenv(BASE_DIR / ".env")

# =========================================
# EN: Import SQLAlchemy Base and models
# JP: SQLAlchemy の Base とモデルを読み込みます
# =========================================

from app.database import Base
from app.models import Ticket

# this is the Alembic Config object
config = context.config

# =========================================
# EN: Read DATABASE_URL from environment
# JP: 環境変数から DATABASE_URL を読み込みます
# =========================================

database_url = os.getenv("DATABASE_URL")

if database_url:
    config.set_main_option("sqlalchemy.url", database_url)

# Interpret the config file for Python logging
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# =========================================
# EN: Alembic compares this metadata with the database
# JP: Alembic はこの metadata とデータベースを比較します
# =========================================

target_metadata = Base.metadata


def run_migrations_offline() -> None:
    """Run migrations in offline mode."""
    url = config.get_main_option("sqlalchemy.url")

    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online() -> None:
    """Run migrations in online mode."""
    connectable = engine_from_config(
        config.get_section(config.config_ini_section, {}),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata,
            compare_type=True,
        )

        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()