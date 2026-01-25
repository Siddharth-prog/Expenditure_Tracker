import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import DashboardNavbar from "../../components/dashboard/DashboardNavbar";
import { useMonthlyAnalytics } from "../../hooks/analytics/useMonthlyAnalytics";

export default function MonthlyReview() {
  const month = new Date().toISOString().slice(0, 7);
  const { data = [] } = useMonthlyAnalytics(month);

  return (
    <div className="bg-bg min-h-screen">
      <DashboardNavbar />

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <h2 className="text-2xl font-semibold">Monthly Review</h2>

        <div className="bg-surface p-6 rounded-xl">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <XAxis dataKey="week" />
              <Tooltip />
              <Bar dataKey="spent" fill="#4DA3FF" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
