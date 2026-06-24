from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

# =========================================
# EN: Local SQLite database for fast MVP development
# JP: MVP開発用のローカル SQLite データベース
# =========================================

DATABASE_URL = "sqlite:///./ai_hr_support.db"

# =========================================
# EN: SQLite needs this option for FastAPI local development
# JP: FastAPI のローカル開発では SQLite にこの設定が必要です
# =========================================

engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False},
)

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