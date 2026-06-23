// @ts-ignore: importing JS module without declaration file
import { StatCard } from "../components/StatCard";
import { TicketTable } from "../components/TicketTable";
import { TicketReviewPanel } from "../components/TicketReviewPanel";

import type { Ticket } from "../types/ticket";

type HRDashboardProps = {
  tickets: Ticket[];
};

export function HRDashboard({ tickets }: HRDashboardProps) {
  const highPriorityCount = tickets.filter(
    (ticket) => ticket.priority === "High"
  ).length;

  const payrollCount = tickets.filter(
    (ticket) => ticket.category === "Payroll"
  ).length;

  return (
    <section className="page-content">
      <div className="dashboard-heading">
        <h2>Dashboard</h2>
        <p>
          Review HR tickets, AI classification results, priorities, and draft
          responses.
        </p>
      </div>

      <section className="overview-grid">
        <article className="large-panel">
          <div className="panel-title-row">
            <h3>Ticket Classification Overview</h3>
            <span>Mock AI</span>
          </div>

          <div className="eligibility-layout">
            <div className="circle-score">
              <span>71%</span>
            </div>

            <div>
              <h4>High Priority Review</h4>
              <p>
                Tickets with urgent, blocked, missing, or access-related
                keywords are flagged for faster HR review.
              </p>
            </div>
          </div>

          <div className="status-summary-row warning-row">
            <span>High Priority</span>
            <strong>{highPriorityCount}</strong>
            <small>Needs review</small>
          </div>

          <div className="status-summary-row success-row">
            <span>Payroll</span>
            <strong>{payrollCount}</strong>
            <small>Category match</small>
          </div>
        </article>

        <article className="large-panel">
          <div className="panel-title-row">
            <h3>AI Triage Status</h3>
            <span>Live MVP</span>
          </div>

          <div className="donut-placeholder">
            <strong>{tickets.length}</strong>
            <span>Total Tickets</span>
          </div>

          <div className="mini-metrics">
            <StatCard label="Open" value={tickets.length} />
            <StatCard label="High" value={highPriorityCount} />
          </div>
        </article>
      </section>

      <TicketReviewPanel tickets={tickets} />

      <TicketTable tickets={tickets} />
    </section>
  );
}