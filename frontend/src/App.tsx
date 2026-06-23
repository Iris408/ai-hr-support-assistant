import { useEffect, useState } from "react";
import "./App.css";

import { getTickets } from "./api/ticketsApi";
import { Sidebar } from "./components/Sidebar";
import { Topbar } from "./components/Topbar";
import { AdminDashboard } from "./pages/AdminDashboard";
import { EmployeeDashboard } from "./pages/EmployeeDashboard";
import { HRDashboard } from "./pages/HRDashboard";
import type { Ticket, UserRole } from "./types/ticket";

function App() {
  const [activeRole, setActiveRole] = useState<UserRole>("hr_team");
  const [tickets, setTickets] = useState<Ticket[]>([]);

  // =========================================
  // EN: Load all tickets from the backend
  // JP: バックエンドからすべてのチケットを読み込みます
  // =========================================

  const loadTickets = async () => {
    const ticketData = await getTickets();
    setTickets(ticketData);
  };

  useEffect(() => {
    loadTickets();
  }, []);

  return (
    <main className="dashboard-shell">
      <Sidebar activeRole={activeRole} onRoleChange={setActiveRole} />

      <section className="dashboard-main">
        <Topbar activeRole={activeRole} />

        {activeRole === "employee" && (
          <EmployeeDashboard tickets={tickets} onTicketCreated={loadTickets} />
        )}

        {activeRole === "hr_team" && <HRDashboard tickets={tickets} />}

        {activeRole === "admin" && <AdminDashboard tickets={tickets} />}
      </section>
    </main>
  );
}

export default App;