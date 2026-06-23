import type { UserRole } from "../types/ticket";

type TopbarProps = {
  activeRole: UserRole;
};

const roleLabels: Record<UserRole, string> = {
  employee: "Employee View",
  hr_team: "HR Team View",
  admin: "Admin View",
};

export function Topbar({ activeRole }: TopbarProps) {
  return (
    <header className="topbar">
      <div>
        <p className="topbar-label">AI HR Support Assistant</p>
        <h1>{roleLabels[activeRole]}</h1>
      </div>

      <div className="topbar-user">
        <div className="avatar">D</div>
        <span>Demo User</span>
        <span className="language-pill">EN</span>
      </div>
    </header>
  );
}