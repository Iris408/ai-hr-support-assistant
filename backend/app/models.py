from sqlalchemy import Column, DateTime, Integer, String, Text
from sqlalchemy.sql import func

from app.database import Base

# =========================================
# EN: Database table for HR support tickets
# JP: HRサポートチケット用のデータベーステーブル
# =========================================

class Ticket(Base):
    __tablename__ = "tickets"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String, nullable=False)
    message = Column(Text, nullable=False)

    category = Column(String, nullable=False)
    priority = Column(String, nullable=False)
    status = Column(String, nullable=False, default="Open")

    suggested_response = Column(Text, nullable=True)
    classification_reasoning = Column(Text, nullable=True)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())