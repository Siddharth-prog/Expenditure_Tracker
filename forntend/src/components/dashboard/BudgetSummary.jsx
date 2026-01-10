// src/components/dashboard/BudgetSummary.jsx
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#7C7CFF", "#34D399", "#FBBF24", "#F87171"];

export default function BudgetSummary({ sections }) {
  if (!Array.isArray(sections) || sections.length === 0) {
    return (
      <p className="text-textMuted text-sm">
        No budget data available for this month.
      </p>
    );
  }

  // 🎯 Pie data = allocated budget per section
  const data = sections.map((s) => ({
    name: s.section,
    value: s.limit,
  }));

  const totalBudget = sections.reduce(
    (sum, s) => sum + (s.limit || 0),
    0
  );

  return (
    <div className="w-full">

      {/* PIE */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              outerRadius={90}
            >
              {data.map((_, i) => (
                <Cell
                  key={i}
                  fill={COLORS[i % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* LEGEND / SUMMARY */}
      <div className="mt-4 space-y-2 text-sm">
        {sections.map((s) => (
          <div
            key={s.section}
            className="flex justify-between text-textSecondary"
          >
            <span>{s.section}</span>
            <span>₹{s.limit}</span>
          </div>
        ))}

        <div className="flex justify-between font-semibold text-textPrimary border-t border-border pt-2 mt-2">
          <span>Total Budget</span>
          <span>₹{totalBudget}</span>
        </div>
      </div>
    </div>
  );
}
