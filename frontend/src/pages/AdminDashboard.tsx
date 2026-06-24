import { useMemo, useState } from "react";

import { CollapsiblePanel } from "../components/CollapsiblePanel";
import { StatCard } from "../components/StatCard";
import { TicketFilters } from "../components/TicketFilters";
import { TicketQueuePanel } from "../components/TicketQueuePanel";
import type {
  CategoryFilter,
  PriorityFilter,
  SortOrder,
} from "../components/TicketFilters";
import type { Ticket } from "../types/ticket";
import { TicketTable } from "../components/TicketTable";

type AdminDashboardProps = {
  tickets: Ticket[];
};

export function AdminDashboard({ tickets }: AdminDashboardProps) {
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

      <CollapsiblePanel
        title="Admin Ticket Queue"
        description="Review all submitted tickets by category, priority and current status."
      >  
        <TicketQueuePanel
          title="Admin Ticket Queue"
          description="Review all submitted tickets by category, priority and current status."
          tickets={filteredTickets}
        />
      </CollapsiblePanel>
    </section>
  );
}