import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import DashboardNavbar from "../../components/dashboard/DashboardNavbar";

const data = [
  { day: "Mon", spent: 1200 },
  { day: "Tue", spent: 900 },
  { day: "Wed", spent: 1400 },
  { day: "Thu", spent: 1100 },
  { day: "Fri", spent: 1800 },
];

export default function DailyReview() {
  return (
    <div className="bg-bg min-h-screen">
      <DashboardNavbar />

      <div className="p-4 sm:p-6 max-w-7xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">
          Daily Expense Review
        </h2>

        {/* GET /api/analytics/daily */}
        <div className="bg-surface border border-border rounded-xl p-6">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <XAxis dataKey="day" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="spent"
                stroke="#2EE6A6"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
