import os

from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

# =========================================
# EN: Load environment variables from .env
# JP: .env から環境変数を読み込みます
# =========================================

load_dotenv()

# =========================================
# EN: PostgreSQL database URL from environment variable
# JP: 環境変数から PostgreSQL のデータベースURLを取得します
# =========================================

DATABASE_URL = os.getenv("DATABASE_URL")

if DATABASE_URL is None:
    raise ValueError("DATABASE_URL environment variable is not set.")

# =========================================
# EN: Create SQLAlchemy database engine
# JP: SQLAlchemy のデータベースエンジンを作成します
# =========================================

engine = create_engine(DATABASE_URL)

# =========================================
# EN: Create database sessions
# JP: データベースセッションを作成します
# =========================================

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
)

# =========================================
# EN: Base class used by SQLAlchemy models
# JP: SQLAlchemy モデルで使用するベースクラス
# =========================================

Base = declarative_base()


# =========================================
# EN: Dependency used by routes to access the database
# JP: ルートからデータベースへアクセスするための依存関係
# =========================================

def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()