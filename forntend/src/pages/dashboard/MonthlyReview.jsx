import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import DashboardNavbar from "../../components/dashboard/DashboardNavbar";

const data = [
  { week: "Week 1", spent: 9000 },
  { week: "Week 2", spent: 12000 },
  { week: "Week 3", spent: 10500 },
  { week: "Week 4", spent: 11060 },
];

export default function MonthlyReview() {
  return (
    <div className="bg-bg min-h-screen">
      <DashboardNavbar />

      <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
        <h2 className="text-2xl font-semibold">Monthly Review</h2>

        {/* GET /api/analytics/monthly */}
        <div className="bg-surface border border-border rounded-xl p-6">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <XAxis dataKey="week" />
              <Tooltip />
              <Bar dataKey="spent" fill="#4DA3FF" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* GET /api/ai/monthly-review */}
        <div className="bg-surface border border-border rounded-xl p-6">
          <h3 className="font-semibold mb-2">AI Review</h3>
          <p className="text-textSecondary">
            You overspent in Week 2 due to dining and travel. Reducing discretionary
            spending can increase savings by ~15%.
          </p>
        </div>
      </div>
    </div>
  );
}
