def test_create_ticket_returns_created_ticket_with_ai_classification(client):
    ticket_payload = {
        "title": "Missing salary payment",
        "message": "I was not paid this month and need urgent help.",
    }

    response = client.post("/tickets/", json=ticket_payload)

    data = response.json()

    assert response.status_code == 200
    assert data["id"] is not None
    assert data["title"] == "Missing salary payment"
    assert data["message"] == "I was not paid this month and need urgent help."
    assert data["status"] == "Open"
    assert data["category"] == "Payroll"
    assert data["priority"] == "High"
    assert data["suggested_response"] is not None
    assert data["classification_reasoning"] is not None
    assert data["created_at"] is not None
    assert data["updated_at"] is not None

def test_create_ticket_rejects_missing_required_fields(client):
    response = client.post("/tickets/", json={})

    assert response.status_code == 422