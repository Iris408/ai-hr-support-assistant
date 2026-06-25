import { TicketTable } from "./TicketTable";
import type { Ticket } from "../types/ticket";

type TicketQueuePanelProps = {
  title: string;
  description: string;
  tickets: Ticket[];
  onStatusChange?: (ticketId: number, status: string) => void;
};

export function TicketQueuePanel({
  title,
  description,
  tickets,
  onStatusChange,
}: TicketQueuePanelProps) {
  return (
    <section className="queue-panel">
      <div className="queue-panel-header">
        <div>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>

        <span>{tickets.length} tickets</span>
      </div>

      <TicketTable 
        tickets={tickets} 
        onStatusChange={onStatusChange} 
      />
    </section>
  );
}