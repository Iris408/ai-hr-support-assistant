import type { Ticket } from "../types/ticket";

type TicketTableProps = {
  tickets: Ticket[];
};

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

                <span
                  className={`priority-pill priority-${ticket.priority.toLowerCase()}`}
                >
                  {ticket.priority}
                </span>

                <span className="status-pill">{ticket.status}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}