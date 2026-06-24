import { CollapsiblePanel } from "../components/CollapsiblePanel";
// @ts-ignore: no declaration file for StatCard.jsx
import { StatCard } from "../components/StatCard";
import { TicketReviewPanel } from "../components/TicketReviewPanel";
import { TicketTable } from "../components/TicketTable";
import type { Ticket } from "../types/ticket";

import { useMemo, useState } from "react";
import { TicketFilters } from "../components/TicketFilters";
import type { CategoryFilter, PriorityFilter, SortOrder } from "../components/TicketFilters";

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

  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("All");
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>("All");
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");

  const filteredTickets = useMemo(() => {
    return tickets
      .filter((ticket) => {
        if (categoryFilter === "All") {
          return true;
        }

        return ticket.category === categoryFilter;
      })
      .filter((ticket) => {
        if (priorityFilter === "All") {
          return true;
        }

        return ticket.priority === priorityFilter;
      })
      .sort((firstTicket, secondTicket) => {
        const firstDate = new Date(firstTicket.created_at).getTime();
        const secondDate = new Date(secondTicket.created_at).getTime();

        if (sortOrder === "newest") {
          return secondDate - firstDate;
        }

        return firstDate - secondDate;
      });
  }, [tickets, categoryFilter, priorityFilter, sortOrder]);

  return (
    <section className="page-content">
      <div className="dashboard-heading">
        <h2>HR Review Dashboard</h2>
        <p>
          Review incoming employee support tickets, check AI-assisted triage
          results, and prepare response drafts before taking action.
        </p>
      </div>

      <CollapsiblePanel
        title="AI Classification Overview"
        description="Summary of mock AI triage results and high-priority ticket detection."
      >
        <section className="overview-grid">
          <article className="large-panel">
            <div className="panel-title-row">
              <h3>AI Classification Overview</h3>
              <span>Mock AI Mode</span>
            </div>

            <div className="eligibility-layout">
              <div className="circle-score">
                <span>71%</span>
              </div>

              <div>
                <h4>Priority Review</h4>
                <p>
                  Tickets with urgent, blocked, missing, access, or payment
                  keywords are flagged for faster HR review.
                </p>
              </div>
            </div>

            <div className="status-summary-row warning-row">
              <span>High Priority Tickets</span>
              <strong>{highPriorityCount}</strong>
              <small>Needs review</small>
            </div>

            <div className="status-summary-row success-row">
              <span>Payroll Tickets</span>
              <strong>{payrollCount}</strong>
              <small>Detected by category</small>
            </div>
          </article>

          <article className="large-panel">
            <div className="panel-title-row">
              <h3>Triage Status</h3>
              <span>Live MVP</span>
            </div>

            <div className="donut-placeholder">
              <strong>{tickets.length}</strong>
              <span>Total Tickets</span>
            </div>

            <div className="mini-metrics">
              <StatCard label="Open" value={tickets.length} />
              <StatCard label="High priority" value={highPriorityCount} />
            </div>
          </article>
        </section>
      </CollapsiblePanel>

      <TicketFilters
        categoryFilter={categoryFilter}
        priorityFilter={priorityFilter}
        sortOrder={sortOrder}
        onCategoryChange={setCategoryFilter}
        onPriorityChange={setPriorityFilter}
        onSortOrderChange={setSortOrder}
        visibleTickets={filteredTickets}
        totalTickets={tickets.length}
      />  

      <section className="hr-workspace-grid">
        <CollapsiblePanel
          title="AI Review Queue"
          description="Review AI-assisted category, priority, response drafts, and activity notes."
        >
          <TicketReviewPanel tickets={filteredTickets} />
          <TicketTable tickets={filteredTickets} />
        </CollapsiblePanel>

        <CollapsiblePanel
          title="Ticket Queue"
          description="View submitted tickets by category, priority, and current status."
        >
          <TicketTable tickets={tickets} />
        </CollapsiblePanel>
      </section>
    </section>
  );
}