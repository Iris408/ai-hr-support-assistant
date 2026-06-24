from app.schemas import TicketClassification


# =========================================
# EN: Simple mock AI classifier for MVP
# JP: MVP用のシンプルなモックAI分類機能
# =========================================

def classify_ticket(title: str, message: str) -> TicketClassification:
    text = f"{title} {message}".lower()

    category = "Other"
    priority = "Low"
    reasoning = "No specific keyword matched, so the ticket was classified as Other with Low priority."

    if any(word in text for word in ["pay", "salary", "bank", "wage", "payroll"]):
        category = "Payroll"
        reasoning = "The ticket mentions pay, salary, bank details, wages, or payroll."

    elif any(word in text for word in ["holiday", "vacation", "benefit", "pension", "insurance"]):
        category = "Benefits"
        reasoning = "The ticket mentions holidays, benefits, pension, or insurance."

    elif any(word in text for word in ["start", "new joiner", "onboarding", "first day"]):
        category = "Onboarding"
        reasoning = "The ticket mentions starting work, onboarding, or first-day support."

    elif any(word in text for word in ["policy", "rule", "handbook", "procedure"]):
        category = "Policy"
        reasoning = "The ticket mentions company policy, rules, handbook, or procedures."

    if any(word in text for word in ["urgent", "blocked", "missing", "cannot access", "not paid"]):
        priority = "High"
    elif any(word in text for word in ["question", "update", "change", "help"]):
        priority = "Medium"

    suggested_response = (
        "Thank you for contacting HR. We have received your request and an HR team member "
        "will review the details. This suggested response is a draft and should be reviewed "
        "before sending."
    )

    return TicketClassification(
        category=category,
        priority=priority,
        suggested_response=suggested_response,
        reasoning=reasoning,
    )