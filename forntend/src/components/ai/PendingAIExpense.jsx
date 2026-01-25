import { usePendingAIExpenses } from "../../hooks/ai/usePendingAIExpense";
import { useApproveAIExpense } from "../../hooks/ai/useApproveAIExpense";
import { useRejectAIExpense } from "../../hooks/ai/useRejectAIExpense";

export default function AIPendingExpenses({ month }) {
  const { data = [], isLoading } = usePendingAIExpenses();
  const approve = useApproveAIExpense(month);
  const reject = useRejectAIExpense();

  if (isLoading || data.length === 0) return null;

  return (
    <div className="bg-surface border border-border rounded-xl p-5 space-y-4">
      <h3 className="font-semibold">AI Detected Expenses</h3>

      {data.map((e) => (
        <div key={e._id} className="flex justify-between items-center text-sm">
          <div>
            <p className="font-medium">{e.title}</p>
            <p className="text-xs text-textMuted">
              ₹{e.amount} • {e.category} • {e.section}
            </p>
            <p className="text-xs text-textMuted">
              Confidence: {Math.round(e.confidence * 100)}%
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => approve.mutate(e._id)}
              className="text-xs text-glow"
            >
              Approve
            </button>

            <button
              onClick={() => reject.mutate(e._id)}
              className="text-xs text-danger"
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
