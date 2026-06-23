from fastapi import FastAPI

# EN: Create the FastAPI application
# JP: FastAPI アプリケーションを作成します

app = FastAPI(
    title="AI HR Support Assistant API",
    description="Backend API for an AI-assisted HR support ticket dashboard.",
    version="0.1.0",
)

# EN: Root route for checking the API is running
# JP: API が動作しているか確認するためのルート
@app.get("/")
def read_root():
    return {
        "message": "AI HR Support Assistant API is running.",
        "version": "0.1.0",
    }

# EN: Health check route for monitioring/API status
# JP: 監視・API状態確認用のヘルスチェックルート
@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "ai-hr-support assistant-backend",
    }