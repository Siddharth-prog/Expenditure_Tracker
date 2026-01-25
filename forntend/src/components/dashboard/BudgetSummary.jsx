// src/components/dashboard/BudgetSummary.jsx
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#7C7CFF", "#34D399", "#FBBF24", "#F87171"];

export default function BudgetSummary({ income, sections }) {
  if (!sections?.length) {
    return (
      <p className="text-textMuted text-sm">
        No monthly plan created yet.
      </p>
    );
  }

  const totalAllocated = sections.reduce(
    (sum, s) => sum + (s.limit || 0),
    0
  );

  const remaining = income - totalAllocated;

  return (
    <div className="space-y-3">
      {/* INCOME */}
      <div className="flex justify-between text-sm">
        <span className="text-textMuted">Monthly Income</span>
        <span className="font-medium">₹{income}</span>
      </div>

      {/* ALLOCATED */}
      <div className="flex justify-between text-sm">
        <span className="text-textMuted">Allocated</span>
        <span>₹{totalAllocated}</span>
      </div>

      {/* REMAINING */}
      <div className="flex justify-between text-sm">
        <span className="text-textMuted">Remaining</span>
        <span
          className={
            remaining < 0 ? "text-danger" : "text-success"
          }
        >
          ₹{remaining}
        </span>
      </div>
    </div>
  );
}
