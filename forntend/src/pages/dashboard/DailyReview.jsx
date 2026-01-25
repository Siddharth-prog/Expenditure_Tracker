import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import DashboardNavbar from "../../components/dashboard/DashboardNavbar";
import { useDailyAnalytics } from "../../hooks/analytics/useDailyAnalytics";

export default function DailyReview() {
  const month = new Date().toISOString().slice(0, 7);
  const { data = [] } = useDailyAnalytics(month);

  return (
    <div className="bg-bg min-h-screen">
      <DashboardNavbar />

      <div className="max-w-7xl mx-auto p-6">
        <h2 className="text-2xl font-semibold mb-6">Daily Expense Review</h2>

        <div className="bg-surface p-6 rounded-xl">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <XAxis dataKey="day" />
              <Tooltip />
              <Line dataKey="spent" stroke="#2EE6A6" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
