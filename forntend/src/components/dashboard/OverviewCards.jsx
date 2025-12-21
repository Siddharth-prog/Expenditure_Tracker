import { overviewStats } from "../../data/dummyDashboardData";

export default function OverviewCards() {
  const cards = [
    { label: "Total Spent", value: overviewStats.totalSpent },
    { label: "Monthly Budget", value: overviewStats.budget },
    { label: "Avg / Day", value: overviewStats.avgDaily },
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
