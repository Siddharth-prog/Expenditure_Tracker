import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import DashboardNavbar from "../../components/dashboard/DashboardNavbar";
import { useYearlyAnalytics } from "../../hooks/analytics/useYearlyAnalytics";

export default function YearlyReview() {
  const year = new Date().getFullYear().toString();
  const { data = [] } = useYearlyAnalytics(year);

  return (
    <div className="bg-bg min-h-screen">
      <DashboardNavbar />

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <h2 className="text-2xl font-semibold">Yearly Review</h2>

        <div className="bg-surface p-6 rounded-xl">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data}>
              <XAxis dataKey="month" />
              <Tooltip />
              <Area dataKey="spent" stroke="#FFC857" fill="#FFC85755" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
