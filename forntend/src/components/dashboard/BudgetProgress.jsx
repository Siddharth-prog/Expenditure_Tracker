export default function BudgetProgress({ spent, limit }) {
  const percent = Math.min((spent / limit) * 100, 100);
  const exceeded = spent > limit;

  return (
    <div className="h-2 bg-bg rounded overflow-hidden mt-2">
      <div
        className={`h-full transition-all ${
          exceeded ? "bg-danger" : "bg-glow"
        }`}
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
