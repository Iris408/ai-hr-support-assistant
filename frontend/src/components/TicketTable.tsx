import type { Ticket } from "../types/ticket";

type TicketTableProps = {
  tickets: Ticket[];
  onStatusChange?: (ticketId: number, status: string) => void;
};

const statusOptions = ["Open", "In Progress", "Resolved", "Closed"];

function toClassName(value: string) {
  return value.toLowerCase().replace(/\s+/g, "-");
}

export function TicketTable({ tickets, onStatusChange }: TicketTableProps) {
  if (tickets.length === 0) {
    return (
      <div className="empty-card compact-empty-card">
        <h3>No tickets yet</h3>
        <p>Create a ticket from the Employee view to test the dashboard.</p>
      </div>
    );
  }

  return (
    <div className="table-scroll-area">
      <div className="ticket-table">
        {tickets.map((ticket) => (
          <article className="ticket-row" key={ticket.id}>
            <div className="ticket-main">
              <p className="ticket-id">Ticket #{ticket.id}</p>
              <strong>{ticket.title}</strong>
              <p>{ticket.message}</p>
            </div>

            <div className="ticket-meta-grid">
              <div className="ticket-meta-item">
                <span className="ticket-meta-label">Category</span>
                <span
                  className={`category-pill category-${toClassName(
                    ticket.category
                  )}`}
                >
                  {ticket.category}
                </span>
              </div>

              <div className="ticket-meta-item">
                <span className="ticket-meta-label">Priority</span>
                <span
                  className={`priority-pill priority-${toClassName(
                    ticket.priority
                  )}`}
                >
                  {ticket.priority}
                </span>
              </div>

              <div className="ticket-meta-item">
                <span className="ticket-meta-label">Status</span>

                {onStatusChange ? (
                  <select
                    className="status-select"
                    value={ticket.status}
                    onChange={(event) =>
                      onStatusChange(ticket.id, event.target.value)
                    }
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                ) : (
                  <span
                    className={`status-pill status-${toClassName(
                      ticket.status
                    )}`}
                  >
                    {ticket.status}
                  </span>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}