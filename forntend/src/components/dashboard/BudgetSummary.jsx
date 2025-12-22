import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const COLORS = ["#7C7CFF", "#34D399", "#FBBF24"];

export default function BudgetSummary() {
  // BACKEND (later): GET /api/dashboard/summary
  const data = [
    { name: "Essentials", value: 30000 },
    { name: "Lifestyle", value: 15000 },
  ];

  return (
    <div className="h-64">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            innerRadius={60}
            outerRadius={90}
          >
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
