from datetime import datetime

from sqlalchemy import Column, DateTime, Integer, String, Text

from app.database import Base


# =========================================
# EN: Database table for HR support tickets
# JP: HRサポートチケット用のデータベーステーブル
# =========================================

class Ticket(Base):
    __tablename__ = "tickets"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String(200), nullable=False)
    message = Column(Text, nullable=False)

    category = Column(String(50), nullable=False, default="Other")
    priority = Column(String(20), nullable=False, default="Low")
    status = Column(String(50), nullable=False, default="Open")

    suggested_response = Column(Text, nullable=True)
    classification_reasoning = Column(Text, nullable=True)

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow)