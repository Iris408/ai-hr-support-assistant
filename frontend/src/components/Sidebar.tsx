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
    <aside className={`sidebar ${isMenuOpen ? "menu-open" : ""}`}>
      <div className="sidebar-top-row">
        <div className="brand">
          <div className="brand-icon">H</div>

          <div>
            <span className="desktop-brand-text">HRMTECH</span>
            <span className="mobile-brand-text">AI HR Support Assistant</span>
          </div>
        </div>

        <div className="mobile-header-user" aria-label="Demo user controls">
          <div className="avatar">D</div>
          <span className="language-pill">EN</span>
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
        <p>AI HR Support Assistant</p>
        <span>MVP role menu. Real JWT roles later.</span>
      </div>
    </aside>
  );
}