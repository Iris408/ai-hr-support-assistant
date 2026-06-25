import type { Ticket } from "../types/ticket";

// =========================================
// EN: Backend API URL for local development
// JP: ローカル開発用のバックエンドAPI URL
// =========================================

const API_URL = "http://127.0.0.1:8000";

// =========================================
// EN: Get all tickets from the backend
// JP: バックエンドからすべてのチケットを取得します
// =========================================

export async function getTickets(): Promise<Ticket[]> {
  const response = await fetch(`${API_URL}/tickets/`);

  if (!response.ok) {
    throw new Error("Failed to fetch tickets");
  }

  return response.json();
}

// =========================================
// EN: Create a new HR support ticket
// JP: 新しいHRサポートチケットを作成します
// =========================================

export async function createTicket(title: string, message: string): Promise<Ticket> {
  const response = await fetch(`${API_URL}/tickets/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      message,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create ticket");
  }

  return response.json();
}

export async function updateTicketStatus(
  ticketId: number,
  status: string
): Promise<Ticket> {
  const response = await fetch(`${API_URL}/tickets/${ticketId}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    throw new Error("Failed to update ticket status");
  }

  return response.json();
}