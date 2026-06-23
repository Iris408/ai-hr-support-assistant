import { useState } from "react";
import type { UserRole } from "../types/ticket";

type SidebarProps = {
  activeRole: UserRole;
  onRoleChange: (role: UserRole) => void;
};

export function Sidebar({ activeRole, onRoleChange }: SidebarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleRoleChange = (role: UserRole) => {
    onRoleChange(role);
    setIsMenuOpen(false);
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-top-row">
        <div className="brand">
          <div className="brand-icon">H</div>
          <span>HRMTECH</span>
        </div>

        <button
          className="mobile-menu-button"
          type="button"
          onClick={() => setIsMenuOpen((currentValue) => !currentValue)}
        >
          Menu
        </button>
      </div>

      <nav className={`sidebar-nav ${isMenuOpen ? "open" : ""}`}>
        <button
          className={activeRole === "hr_team" ? "active" : ""}
          onClick={() => handleRoleChange("hr_team")}
        >
          HR Team
        </button>

        <button
          className={activeRole === "employee" ? "active" : ""}
          onClick={() => handleRoleChange("employee")}
        >
          Employee
        </button>

        <button
          className={activeRole === "admin" ? "active" : ""}
          onClick={() => handleRoleChange("admin")}
        >
          Admin
        </button>
      </nav>

      <div className="sidebar-footer">
        <p>MVP Mode</p>
        <span>JWT roles later</span>
      </div>
    </aside>
  );
}