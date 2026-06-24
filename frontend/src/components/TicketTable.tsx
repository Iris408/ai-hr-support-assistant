import type { Ticket } from "../types/ticket";

type TicketTableProps = {
  tickets: Ticket[];
};

function toClassName(value: string) {
  return value.toLowerCase().replace(/\s+/g, "-");
}

export function TicketTable({ tickets }: TicketTableProps) {
  return (
    <section className="queue-panel">
      <div className="queue-panel-header">
        <div>
          <h3>Ticket Queue</h3>
          <p>View submitted tickets by category, priority, and current status.</p>
        </div>

        <span>{tickets.length} total</span>
      </div>

      {tickets.length === 0 ? (
        <div className="empty-card compact-empty-card">
          <h3>No tickets yet</h3>
          <p>Create a ticket from the Employee view to test the dashboard.</p>
        </div>
      ) : (
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
                    <span className={`category-pill category-${toClassName(ticket.category)}`}>
                      {ticket.category}
                    </span>
                  </div>

                  <div className="ticket-meta-item">
                    <span className="ticket-meta-label">Priority</span>
                    <span className={`priority-pill priority-${toClassName(ticket.priority)}`}>
                      {ticket.priority}
                    </span>
                  </div>

                  <div className="ticket-meta-item">
                    <span className="ticket-meta-label">Status</span>
                    <span className={`status-pill status-${toClassName(ticket.status)}`}>
                      {ticket.status}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}