def test_get_tickets_returns_empty_list_when_no_tickets_exist(client):
    response = client.get("/tickets/")

    assert response.status_code == 200
    assert response.json() == []

def test_get_tickets_returns_created_tickets(client):
    first_ticket = {
        "title": "Holiday question",
        "message": "I have a question about holiday allowance.",
    }    

    second_ticket = {
        "title": "Policy update",
        "message": "Can you help me understand this new policy?",
    }

    client.post("/tickets/", json=first_ticket)
    client.post("/tickets/", json=second_ticket)

    response = client.get("/tickets/")

    data = response.json()

    assert response.status_code == 200
    assert len(data) == 2

    titles = [ticket["title"] for ticket in data]

    assert "Holiday question" in titles
    assert "Policy update" in titles