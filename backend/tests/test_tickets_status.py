def create_sample_ticket(client):
    response = client.post(
        "/tickets/",
        json={
            "title": "Onboarding support",
            "message": "I'm a new joiner and need help with my onboarding setup.",
        },
    )

    return response.json()

def test_tickets_status_can_move_through_lifecycle(client):
    ticket = create_sample_ticket(client)
    ticket_id = ticket["id"]

    statuses = ["In Progress", "Resolved", "Closed"]

    for status in statuses:
        response = client.patch(
            f"/tickets/{ticket_id}/status",
            json={"status": status},
        )

        data = response.json()

        assert response.status_code == 200
        assert data["id"] == ticket_id
        assert data["status"] == status

def test_invalid_ticket_status_is_rejected(client):
    ticket = create_sample_ticket(client)
    ticket_id = ticket["id"]

    response = client.patch(
        f"/tickets/{ticket_id}/status",
        json={"status": "Archived"},
    )       

    assert response.status_code == 400
    assert response.json()["detail"] == "Invalid ticket status."

def test_status_update_for_missing_ticket_returns_404(client):
    response = client.patch(
        "/tickets/999/status",
        json={"status": "Resolved"},
    )

    assert response.status_code == 404
    assert response.json()["detail"] == "Ticket not found."