import { aiInsight } from "../../data/dummyDashboardData";

export default function AIInsights() {
  return (
    <div className="bg-surface border border-border rounded-xl p-5">
      <h3 className="font-semibold mb-3">AI Insights</h3>
      <p className="text-textSecondary text-sm">
        {aiInsight}
      </p>
    </div>
  );
}
