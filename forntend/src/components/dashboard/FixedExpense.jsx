import { fixedExpenses } from "../../data/dummyDashboardData";

export default function FixedExpenses() {
  return (
    <div className="bg-surface border border-border rounded-xl p-5">
      <h3 className="font-semibold mb-4">Fixed Expenses</h3>

      {fixedExpenses.map((f, i) => (
        <div key={i} className="flex justify-between mb-2">
          <span>{f.name}</span>
          <span>₹{f.amount}</span>
        </div>
      ))}
    </div>
  );
}
