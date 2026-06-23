import type { Ticket } from "../types/ticket";

type TicketReviewPanelProps = {
    tickets: Ticket[];
};

export function TicketReviewPanel({ tickets }: TicketReviewPanelProps) {
    if (tickets.length === 0) {
        return (
            <section className="review-panel empty-card">
                <h3>No tickets ready for review</h3>
                <p> Submitted tickets will appear here with AI classification details.</p>
            </section>
        );
    }

    return (
        <section className="review-panel">
            <div className="review-panel-header">
                <div>
                    <h3>AI Review Queue</h3>
                    <p>
                        HR team members can review category, priority, suggested response
                        drafts and internal AI notes before taking action.
                    </p>
                </div>

                <span>{tickets.length} tickets</span>
            </div>

            <div className="review-card-grid">
                {tickets.map((ticket) => (
                    <article className="review-card" key={ticket.id}>
                        <div className="review-card-header">
                            <div>
                                <p className="ticket-id">Ticket #{ticket.id}</p>
                                <h4>{ticket.title}</h4>
                            </div>

                            <span className={`priority-pill priority-${ticket.priority.toLowerCase()}`}>
                                {ticket.priority}
                            </span>
                        </div>

                        <p className="review-message">{ticket.message}</p>
                        
                        <div className="review-meta-row">
                            <span className="category-pill">{ticket.category}</span>
                            <span className="status-pill">{ticket.status}</span>
                        </div>

                        <div className="ai-response-box">
                            <h5>Suggested response draft</h5>
                            <p>{ticket.suggested_response}</p>
                        </div>

                        <div className="ai-note-box">
                            <h5>Internal AI note</h5>
                            <p>{ticket.classification_reasoning}</p>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}