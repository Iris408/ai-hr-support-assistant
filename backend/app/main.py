from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app.routes import tickets

# =========================================
# EN: Create database tables for the MVP
# JP: MVP用のデータベーステーブルを作成します
#
# NOTE:
# EN: Later, this will be replaced with Alembic migrations.
# JP: 後で Alembic マイグレーションに置き換えます。
# =========================================

# Base.metadata.create_all(bind=engine)

# =========================================
# EN: Create the FastAPI application
# JP: FastAPI アプリケーションを作成します
# =========================================

app = FastAPI(
    title="AI HR Support Assistant API",
    description="Backend API for an AI-assisted HR support ticket dashboard.",
    version="0.1.0",
)

# =========================================
# EN: Allow frontend requests during local development
# JP: ローカル開発中にフロントエンドからのリクエストを許可します
# =========================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =========================================
# EN: Register ticket routes
# JP: チケット用ルートを登録します
# =========================================

app.include_router(tickets.router)


# =========================================
# EN: Root route for checking the API is running
# JP: API が動作しているか確認するためのルート
# =========================================

@app.get("/")
def read_root():
    return {
        "message": "AI HR Support Assistant API is running",
        "version": "0.1.0",
    }


# =========================================
# EN: Health check route for monitoring/API status
# JP: 監視・API状態確認用のヘルスチェックルート
# =========================================

@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "ai-hr-support-assistant-backend",
    }