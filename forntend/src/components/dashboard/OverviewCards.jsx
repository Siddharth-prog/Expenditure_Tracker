import { useDashboard } from "../../hooks/dashboard/useDashboard";

export default function OverviewCards({ month }) {
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

  const income = data?.overview?.income ?? 0;
  const totalSpent = data?.overview?.totalSpent ?? 0;

  const savings = income - totalSpent; // ✅ can be negative

  const cards = [
    {
      label: "Monthly Income",
      value: income,
    },
    {
      label: "Total Spent",
      value: totalSpent,
    },
    {
      label: "Savings",
      value: savings,
      danger: savings < 0,
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
          <p
            className={`text-2xl font-semibold mt-1 ${
              c.danger ? "text-danger" : "text-textPrimary"
            }`}
          >
            ₹{c.value}
          </p>
        </div>
      ))}
    </div>
  );
}
