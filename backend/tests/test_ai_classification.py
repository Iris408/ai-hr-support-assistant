from app.ai_helper import classify_ticket


def test_payroll_ticket_is_classified_as_payroll_high_priority():
    classification = classify_ticket(
        title="Payroll issue",
        message="I was not paid and this is urgent.",
    )

    assert classification.category == "Payroll"
    assert classification.priority == "High"
    assert classification.suggested_response is not None
    assert classification.reasoning is not None


def test_benefits_ticket_is_classified_as_benefits():
    classification = classify_ticket(
        title="Pension question",
        message="I have a question about my pension and insurance benefits.",
    )

    assert classification.category == "Benefits"
    assert classification.priority == "Medium"


def test_unknown_ticket_defaults_to_other_low_priority():
    classification = classify_ticket(
        title="General note",
        message="I would like to share some information.",
    )

    assert classification.category == "Other"
    assert classification.priority == "Low"