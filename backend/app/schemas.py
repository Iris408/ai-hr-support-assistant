from datetime import datetime
from typing import Optional

from pydantic import BaseModel


# =========================================
# EN: Data needed when creating a new ticket
# JP: 新しいチケットを作成するときに必要なデータ
# =========================================

class TicketCreate(BaseModel):
    title: str
    message: str


# =========================================
# EN: Data returned after mock AI classification
# JP: モックAI分類後に返されるデータ
# =========================================

class TicketClassification(BaseModel):
    category: str
    priority: str
    suggested_response: str
    reasoning: str


# =========================================
# EN: Data returned to the frontend
# JP: フロントエンドへ返すデータ
# =========================================

class TicketRead(BaseModel):
    id: int
    title: str
    message: str
    category: str
    priority: str
    status: str
    suggested_response: Optional[str]
    classification_reasoning: Optional[str]
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True