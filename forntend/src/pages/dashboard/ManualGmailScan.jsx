import { useState } from "react";
import { scanEmails } from "../../api/aiExpense.api";

export default function ManualGmailScan() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleScan = async () => {
    try {
      setLoading(true);
      setResult(null);
      const res = await scanEmails();
      setResult(res.data);
    } catch (e) {
      alert(e.response?.data?.message || "Scan failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-surface border border-border rounded-xl p-5">
      <h3 className="font-semibold mb-2">Gmail Expense Scan</h3>

      <button
        onClick={handleScan}
        disabled={loading}
        className="bg-glow text-bg px-4 py-2 rounded disabled:opacity-60"
      >
        {loading ? "Scanning…" : "Scan Gmail"}
      </button>

      {result && (
        <p className="text-sm text-textMuted mt-3">
          Scanned {result.scanned}, added {result.added}
        </p>
      )}
    </div>
  );
}
