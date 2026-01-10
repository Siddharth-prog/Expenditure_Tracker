import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useDashboard } from "../../hooks/dashboard/useDashboard";

const COLORS = ["#2EE6A6", "#4DA3FF", "#FFC857", "#FF6A6A"];

export default function ExpensePieChart({ month }) {
  const { data, isLoading } = useDashboard(month);

  if (isLoading) return null;

  return (
    <div className="bg-surface border border-border rounded-xl p-5">
      <h3 className="font-semibold mb-4">Expense Breakdown</h3>

      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={data.pie.bySection}
            dataKey="value"
            innerRadius="55%"
            outerRadius="80%"
          >
            {data.pie.bySection.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
