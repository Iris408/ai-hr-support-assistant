import type { Ticket } from "../types/ticket";

type TicketReviewPanelProps = {
  tickets: Ticket[];
};

function toClassName(value: string) {
  return value.toLowerCase().replace(/\s+/g, "-");
}

export function TicketReviewPanel({ tickets }: TicketReviewPanelProps) {
  return (
    <section className="queue-panel">
      <div className="queue-panel-header">
        <div>
          <h3>AI Review Queue</h3>
          <p>
            Review AI-assisted category, priority, response drafts, and activity
            notes before HR action.
          </p>
        </div>

        <span>{tickets.length} tickets</span>
      </div>

      {tickets.length === 0 ? (
        <div className="empty-card compact-empty-card">
          <h3>No tickets ready for review</h3>
          <p>Submitted tickets will appear here with AI classification details.</p>
        </div>
      ) : (
        <div className="queue-scroll-area">
          <div className="review-card-stack">
            {tickets.map((ticket) => (
              <article className="review-card" key={ticket.id}>
                <div className="review-card-header">
                  <div>
                    <p className="ticket-id">Ticket #{ticket.id}</p>
                    <h4>{ticket.title}</h4>
                  </div>

                  <span className={`priority-pill priority-${toClassName(ticket.priority)}`}>
                    {ticket.priority}
                  </span>
                </div>

                <p className="review-message">{ticket.message}</p>

                <div className="review-meta-row">
                  <span className={`category-pill category-${toClassName(ticket.category)}`}>
                    {ticket.category}
                  </span>

                  <span className={`status-pill status-${toClassName(ticket.status)}`}>
                    {ticket.status}
                  </span>
                </div>

                <div className="ai-response-box">
                  <h5>Suggested response draft</h5>
                  <p>{ticket.suggested_response}</p>
                </div>

                <div className="ai-note-box">
                  <h5>Internal AI note</h5>
                  <p>{ticket.classification_reasoning}</p>
                </div>

                <div className="activity-log-box">
                  <h5>Review log</h5>

                  <ul>
                    <li>Ticket submitted by employee.</li>
                    <li>Mock AI classification completed.</li>
                    <li>Ready for HR team review.</li>
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}