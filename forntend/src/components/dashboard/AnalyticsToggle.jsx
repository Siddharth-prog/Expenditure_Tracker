import { useState } from "react";

export default function AnalyticsToggle() {
  const [mode, setMode] = useState("monthly");

  return (
    <div className="bg-surface border border-border rounded-xl p-5">
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        {["daily", "monthly"].map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-6 py-3 rounded ${
              mode === m ? "bg-glow text-bg" : "bg-bg"
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      <p className="text-textSecondary">
        Showing {mode} analytics
      </p>
    </div>
  );
}
