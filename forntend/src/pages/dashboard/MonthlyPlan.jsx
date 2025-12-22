import DashboardNavbar from "../../components/dashboard/DashboardNavbar";
import { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#7C7CFF", "#34D399", "#FBBF24", "#F87171"];

export default function MonthlyPlan() {
  const [income, setIncome] = useState(50000);

  // 🔑 Budget divisions defined here
  const [divisions, setDivisions] = useState([
    { name: "Essentials", allocated: 30000 },
    { name: "Lifestyle", allocated: 15000 },
  ]);

  /* ---------- AGGREGATION FOR PIE ---------- */
  const pieData = divisions.map((d) => ({
    name: d.name,
    value: d.allocated,
  }));

  const totalAllocated = divisions.reduce(
    (sum, d) => sum + d.allocated,
    0
  );

  /* ---------- ADD DIVISION ---------- */
  const addDivision = () => {
    setDivisions((prev) => [
      ...prev,
      { name: "", allocated: 0 },
    ]);
  };

  /* ---------- UPDATE DIVISION ---------- */
  const updateDivision = (index, key, value) => {
    setDivisions((prev) =>
      prev.map((d, i) =>
        i === index ? { ...d, [key]: value } : d
      )
    );
  };

  /* ---------- SAVE (BACKEND HOOK) ---------- */
  const saveMonthlyPlan = () => {
    const payload = {
      month: "2025-01", // backend-generated ideally
      income,
      divisions,
    };

    console.log("SEND TO BACKEND:", payload);

    // 🔌 BACKEND
    // POST /api/monthly-plan
  };

  return (
    <div className="bg-bg min-h-screen">
      <DashboardNavbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-textPrimary">
          Monthly Budget Plan
        </h2>

        {/* INCOME */}
        <div className="bg-surface border border-border rounded-xl p-4">
          <label className="text-sm text-textSecondary">
            Monthly Income
          </label>
          <input
            type="number"
            value={income}
            onChange={(e) => setIncome(+e.target.value)}
            className="text-black mt-2"
          />
        </div>

        {/* DIVISIONS */}
        <div className="bg-surface border border-border rounded-xl p-4 space-y-4">
          <h3 className="font-semibold text-textPrimary">
            Budget Divisions
          </h3>

          {divisions.map((d, index) => (
            <div
              key={index}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3"
            >
              <input
                className="text-green-700"
                placeholder="Division name (e.g. Lifestyle)"
                value={d.name}
                onChange={(e) =>
                  updateDivision(index, "name", e.target.value)
                }
              />

              <input
                type="number"
                className="text-blue-700"
                placeholder="Allocated amount"
                value={d.allocated}
                onChange={(e) =>
                  updateDivision(
                    index,
                    "allocated",
                    Number(e.target.value)
                  )
                }
              />
            </div>
          ))}

          <button
            onClick={addDivision}
            className="text-sm text-glow hover:underline"
          >
            + Add Budget Division
          </button>
        </div>

        {/* PIE CHART */}
        <div className="bg-surface border border-border rounded-xl p-4">
          <h3 className="font-semibold text-textPrimary mb-4">
            Allocation Overview
          </h3>

          <div className="h-[260px] sm:h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  innerRadius={60}
                  outerRadius={90}
                >
                  {pieData.map((_, i) => (
                    <Cell
                      key={i}
                      fill={COLORS[i % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <p
            className={`text-sm mt-4 ${
              totalAllocated > income
                ? "text-danger"
                : "text-textSecondary"
            }`}
          >
            Allocated ₹{totalAllocated} / ₹{income}
          </p>
        </div>

        {/* SAVE */}
        <button
          onClick={saveMonthlyPlan}
          className="bg-glow text-bg px-6 py-3 rounded-xl w-full sm:w-auto"
        >
          Save Monthly Plan
        </button>
      </div>
    </div>
  );
}
