import { savings } from "../../data/dummyFinanceData";

export default function SavingsSummary() {
  return (
    <div className="bg-surface border border-border rounded-xl p-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <p className="text-textMuted">Income</p>
          <p className="text-xl font-semibold">₹{savings.income}</p>
        </div>
        <div>
          <p className="text-textMuted">Spent</p>
          <p className="text-xl font-semibold">₹{savings.spent}</p>
        </div>
        <div>
          <p className="text-textMuted">Saved</p>
          <p className="text-xl font-semibold text-glow">
            ₹{savings.saved}
          </p>
        </div>
      </div>

      {/* POST /api/savings/add */}
      <button className="mt-6 bg-glow px-6 py-2 rounded text-bg">
        Add to Savings
      </button>
    </div>
  );
}
