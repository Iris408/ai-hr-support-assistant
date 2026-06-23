import type { ReactNode } from "react";

type CollapsiblePanelProps = {
  title: string;
  description?: string;
  children: ReactNode;
  defaultOpen?: boolean;
};

export function CollapsiblePanel({
  title,
  description,
  children,
  defaultOpen = true,
}: CollapsiblePanelProps) {
  return (
    <details className="collapsible-panel" open={defaultOpen}>
      <summary>
        <div>
          <h3>{title}</h3>
          {description && <p>{description}</p>}
        </div>

        <span className="summary-icon">⌄</span>
      </summary>

      <div className="collapsible-content">{children}</div>
    </details>
  );
}