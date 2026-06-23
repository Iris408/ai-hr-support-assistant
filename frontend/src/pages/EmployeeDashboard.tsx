import { type FormEvent, useState } from "react";

import { createTicket } from "../api/ticketsApi";
import { TicketTable } from "../components/TicketTable";
import type { Ticket } from "../types/ticket";

type EmployeeDashboardProps = {
  tickets: Ticket[];
  onTicketCreated: () => Promise<void>;
};

export function EmployeeDashboard({
  tickets,
  onTicketCreated,
}: EmployeeDashboardProps) {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim() || !message.trim()) {
      return;
    }

    setIsSubmitting(true);

    await createTicket(title, message);
    await onTicketCreated();

    setTitle("");
    setMessage("");
    setIsSubmitting(false);
  };

  return (
    <section className="page-content">
      <div className="dashboard-heading">
        <h2>Employee Request Portal</h2>
        <p>
          Submit an HR support request. The MVP will classify it using mock AI
          and send it to the HR review dashboard.
        </p>
      </div>

      <section className="employee-layout">
        <form className="request-card" onSubmit={handleSubmit}>
          <h3>Submit HR Request</h3>

          <label htmlFor="title">Ticket title</label>
          <input
            id="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Input your ticket here"
          />

          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Hi Team. I need help updating my bank details for next month's payroll."
          />

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit ticket"}
          </button>
        </form>

        <TicketTable tickets={tickets} />
      </section>
    </section>
  );
}