import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { expenseBreakdown } from "../../data/dummyDashboardData";

const COLORS = ["#2EE6A6", "#4DA3FF", "#FFC857", "#FF6A6A"];

export default function ExpensePieChart() {
  return (
    <div className="bg-surface border border-border rounded-xl p-5">
      <h3 className="font-semibold mb-4">Expense Breakdown</h3>

      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={expenseBreakdown}
            dataKey="value"
            innerRadius="55%"
            outerRadius="80%"
          >
            {expenseBreakdown.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
