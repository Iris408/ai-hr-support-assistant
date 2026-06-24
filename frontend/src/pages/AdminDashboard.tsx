import { CollapsiblePanel } from "../components/CollapsiblePanel";
// @ts-ignore - StatCard.jsx lacks declaration file
import { StatCard } from "../components/StatCard";
import { TicketTable } from "../components/TicketTable";
import type { Ticket } from "../types/ticket";

type AdminDashboardProps = {
  tickets: Ticket[];
};

export function AdminDashboard({ tickets }: AdminDashboardProps) {
  const highPriorityCount = tickets.filter(
    (ticket) => ticket.priority === "High"
  ).length;

  const openCount = tickets.filter((ticket) => ticket.status === "Open").length;

  const categories = new Set(tickets.map((ticket) => ticket.category));

  return (
    <section className="page-content">
      <div className="dashboard-heading">
        <h2>Admin Overview</h2>
        <p>
          View operational stats for HR ticket volume, priority, and category
          distribution.
        </p>
      </div>

      <section className="admin-stats-grid">
        <StatCard label="Total tickets" value={tickets.length} />
        <StatCard label="Open tickets" value={openCount} />
        <StatCard label="High priority" value={highPriorityCount} />
        <StatCard label="Categories" value={categories.size} />
      </section>

      <CollapsiblePanel
        title="Admin Ticket Queue"
        description="Review all submitted tickets by category, priority, and current status."
      >
        <TicketTable tickets={tickets} />
      </CollapsiblePanel>
    </section>
  );
}