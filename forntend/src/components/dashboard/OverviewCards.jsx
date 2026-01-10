import { useDashboard } from "../../hooks/dashboard/useDashboard";

export default function OverviewCards() {
  const month = new Date().toISOString().slice(0, 7);
  const { data, isLoading } = useDashboard(month);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-surface border border-border rounded-xl p-5 animate-pulse"
          >
            <div className="h-4 bg-border rounded w-1/2 mb-2" />
            <div className="h-6 bg-border rounded w-3/4" />
          </div>
        ))}
      </div>
    );
  }

  const cards = [
    {
      label: "Total Spent",
      value: data.overview.totalSpent,
    },
    {
      label: "Monthly Budget",
      value: data.overview.totalBudget,
    },
    {
      label: "Savings",
      value: data.overview.savings,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {cards.map((c, i) => (
        <div
          key={i}
          className="bg-surface border border-border rounded-xl p-5"
        >
          <p className="text-textMuted text-sm">{c.label}</p>
          <p className="text-2xl font-semibold text-textPrimary mt-1">
            ₹{c.value}
          </p>
        </div>
      ))}
    </div>
  );
}
