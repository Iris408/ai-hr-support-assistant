import type { Ticket } from "../types/ticket";

export type CategoryFilter =
  | "All"
  | "Payroll"
  | "Benefits"
  | "Onboarding"
  | "Policy"
  | "Other";

export type PriorityFilter = "All" | "Low" | "Medium" | "High";

export type SortOrder = "newest" | "oldest";

type TicketFiltersProps = {
  categoryFilter: CategoryFilter;
  priorityFilter: PriorityFilter;
  sortOrder: SortOrder;
  onCategoryChange: (category: CategoryFilter) => void;
  onPriorityChange: (priority: PriorityFilter) => void;
  onSortOrderChange: (sortOrder: SortOrder) => void;
  visibleTickets: Ticket[];
  totalTickets: number;
};

const categoryOptions: CategoryFilter[] = [
  "All",
  "Payroll",
  "Benefits",
  "Onboarding",
  "Policy",
  "Other",
];

const priorityOptions: PriorityFilter[] = ["All", "Low", "Medium", "High"];

export function TicketFilters({
  categoryFilter,
  priorityFilter,
  sortOrder,
  onCategoryChange,
  onPriorityChange,
  onSortOrderChange,
  visibleTickets,
  totalTickets,
}: TicketFiltersProps) {
  return (
    <section className="filter-panel">
      <div>
        <h3>Ticket Filters</h3>
        <p>
          Showing {visibleTickets.length} of {totalTickets} tickets.
        </p>
      </div>

      <div className="filter-controls">
        <label>
          Category
          <select
            value={categoryFilter}
            onChange={(event) =>
              onCategoryChange(event.target.value as CategoryFilter)
            }
          >
            {categoryOptions.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <label>
          Priority
          <select
            value={priorityFilter}
            onChange={(event) =>
              onPriorityChange(event.target.value as PriorityFilter)
            }
          >
            {priorityOptions.map((priority) => (
              <option key={priority} value={priority}>
                {priority}
              </option>
            ))}
          </select>
        </label>

        <label>
          Sort
          <select
            value={sortOrder}
            onChange={(event) =>
              onSortOrderChange(event.target.value as SortOrder)
            }
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
          </select>
        </label>
      </div>
    </section>
  );
}