import type { Ticket } from "../types/ticket";

type TicketTableProps = {
  tickets: Ticket[];
};

export function TicketTable({ tickets }: TicketTableProps) {
  if (tickets.length === 0) {
    return (
      <div className="empty-card">
        <h3>No tickets yet</h3>
        <p>Create a ticket from the Employee view to test the dashboard.</p>
      </div>
    );
  }

  return (
    <div className="table-card">
      <div className="table-header">
        <h2>Ticket Queue</h2>
        <span>{tickets.length} total</span>
      </div>

      <div className="ticket-table">
        <div className="ticket-row ticket-row-heading">
          <span>Ticket</span>
          <span>Category</span>
          <span>Priority</span>
          <span>Status</span>
        </div>

        {tickets.map((ticket) => (
          <div className="ticket-row" key={ticket.id}>
            <div>
              <strong>{ticket.title}</strong>
              <p>{ticket.message}</p>
            </div>

            <span className="category-pill">{ticket.category}</span>

            <span className={`priority-pill priority-${ticket.priority.toLowerCase()}`}>
              {ticket.priority}
            </span>

            <span className="status-pill">{ticket.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}