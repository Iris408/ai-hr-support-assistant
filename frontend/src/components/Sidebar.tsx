import type { UserRole } from "../types/ticket";

type SidebarProps = {
  activeRole: UserRole;
  onRoleChange: (role: UserRole) => void;
};

export function Sidebar({ activeRole, onRoleChange }: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-icon">H</div>
        <span>HRMTECH</span>
      </div>

      <nav className="sidebar-nav">
        <button
          className={activeRole === "hr_team" ? "active" : ""}
          onClick={() => onRoleChange("hr_team")}
        >
          Dashboard
        </button>

        <button
          className={activeRole === "employee" ? "active" : ""}
          onClick={() => onRoleChange("employee")}
        >
          Employee
        </button>

        <button
          className={activeRole === "admin" ? "active" : ""}
          onClick={() => onRoleChange("admin")}
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