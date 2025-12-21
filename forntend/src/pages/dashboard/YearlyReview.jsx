import {
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import DashboardNavbar from "../../components/dashboard/DashboardNavbar";

const data = [
  { month: "Jan", spent: 32000 },
  { month: "Feb", spent: 29000 },
  { month: "Mar", spent: 35000 },
  { month: "Apr", spent: 31000 },
];

export default function YearlyReview() {
  return (
    <div className="bg-bg min-h-screen">
      <DashboardNavbar />

      <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
        <h2 className="text-2xl font-semibold">Yearly Review</h2>

        {/* GET /api/analytics/yearly */}
        <div className="bg-surface border border-border rounded-xl p-6">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data}>
              <XAxis dataKey="month" />
              <Tooltip />
              <Area
                dataKey="spent"
                stroke="#FFC857"
                fill="#FFC85755"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* GET /api/ai/yearly-review */}
        <div className="bg-surface border border-border rounded-xl p-6">
          <h3 className="font-semibold mb-2">AI Summary</h3>
          <p className="text-textSecondary">
            Your yearly expenses increased mainly due to lifestyle upgrades.
            Automating savings could help stabilize finances next year.
          </p>
        </div>
      </div>
    </div>
  );
}
