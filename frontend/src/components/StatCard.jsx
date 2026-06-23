export function StatCard({ label, value, helperText }) {
  return (
    <article className="stat-card">
      <p>{label}</p>
      <strong>{value}</strong>
      {helperText && <span>{helperText}</span>}
    </article>
  );
}