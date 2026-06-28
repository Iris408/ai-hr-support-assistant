from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.ai_helper import classify_ticket
from app.database import get_db
from app.models import Ticket
from app.schemas import TicketCreate, TicketRead, TicketStatusUpdate

router = APIRouter(prefix="/tickets", tags=["Tickets"])


# =========================================
# EN: Create a new HR ticket and classify it with mock AI
# JP: 新しいHRチケットを作成し、モックAIで分類します
# =========================================

@router.post("/", response_model=TicketRead)
def create_ticket(ticket_data: TicketCreate, db: Session = Depends(get_db)):
    classification = classify_ticket(
        title=ticket_data.title,
        message=ticket_data.message,
    )

    new_ticket = Ticket(
        title=ticket_data.title,
        message=ticket_data.message,
        category=classification.category,
        priority=classification.priority,
        status="Open",
        suggested_response=classification.suggested_response,
        classification_reasoning=classification.reasoning,
    )

    db.add(new_ticket)
    db.commit()
    db.refresh(new_ticket)

    return new_ticket


# =========================================
# EN: Get all HR support tickets
# JP: すべてのHRサポートチケットを取得します
# =========================================

@router.get("/", response_model=list[TicketRead])
def get_tickets(db: Session = Depends(get_db)):
    tickets = db.query(Ticket).order_by(Ticket.created_at.desc()).all()

    return tickets


@router.patch("/{ticket_id}/status", response_model=TicketRead)
def update_ticket_status(
    ticket_id: int,
    status_update: TicketStatusUpdate,
    db: Session = Depends(get_db),
):
    allowed_statuses = ["Open", "In Progress", "Resolved", "Closed"]

    if status_update.status not in allowed_statuses:
        raise HTTPException(status_code=400, detail="Invalid ticket status.")

    ticket = db.query(Ticket).filter(Ticket.id == ticket_id).first()

    if ticket is None:
        raise HTTPException(status_code=404, detail="Ticket not found.")

    ticket.status = status_update.status

    db.commit()
    db.refresh(ticket)

    return ticket