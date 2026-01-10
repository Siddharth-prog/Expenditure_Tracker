import DashboardNavbar from "../../components/dashboard/DashboardNavbar";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useMonthlyPlan } from "../../hooks/budget/useMonthlyPlan";

const COLORS = ["#7C7CFF", "#34D399", "#FBBF24", "#F87171"];

export default function MonthlyPlan() {
  const month = new Date().toISOString().slice(0, 7);

  const {
    plan,
    lockedSections,
    savePlan,
    copyLastMonth,
    isLoading,
  } = useMonthlyPlan(month);

  if (isLoading || !plan) return null;

  /* ---------- DERIVED DATA ---------- */
  const pieData = plan.sections.map((s) => ({
    name: s.section,
    value: s.limit,
  }));

  const totalAllocated = plan.sections.reduce(
    (sum, s) => sum + s.limit,
    0
  );

  const isOverAllocated = totalAllocated > plan.income;

  /* ---------- UPDATE HELPERS ---------- */
  const updateIncome = (income) => {
    savePlan({
      month,
      income,
      sections: plan.sections,
    });
  };

  const updateSection = (index, key, value) => {
    const updated = [...plan.sections];
    updated[index] = {
      ...updated[index],
      [key]: value,
    };

    savePlan({
      month,
      income: plan.income,
      sections: updated,
    });
  };

  const addSection = () => {
    savePlan({
      month,
      income: plan.income,
      sections: [
        ...plan.sections,
        { section: "", limit: 0 },
      ],
    });
  };

  return (
    <div className="bg-bg min-h-screen">
      <DashboardNavbar />

      <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        <h2 className="text-2xl font-semibold">
          Monthly Budget Plan
        </h2>

        {/* COPY LAST MONTH */}
        <button
          onClick={() => copyLastMonth(month)}
          className="text-sm text-glow hover:underline"
        >
          Copy last month
        </button>

        {/* INCOME */}
        <div className="bg-surface p-4 rounded-xl">
          <label className="text-sm">Monthly Income</label>
          <input
            type="number"
            value={plan.income}
            onChange={(e) =>
              updateIncome(Number(e.target.value))
            }
            className="text-black mt-2"
          />
        </div>

        {/* SECTIONS */}
        <div className="bg-surface p-4 rounded-xl space-y-4">
          <h3 className="font-semibold">Budget Divisions</h3>

          {plan.sections.map((s, index) => {
            const locked = lockedSections.includes(
              s.section
            );

            return (
              <div
                key={index}
                className="grid sm:grid-cols-3 gap-3"
              >
                <input
                  value={s.section}
                  disabled={locked}
                  onChange={(e) =>
                    updateSection(
                      index,
                      "section",
                      e.target.value
                    )
                  }
                  className="text-black"
                />

                <input
                  type="number"
                  value={s.limit}
                  disabled={locked}
                  onChange={(e) =>
                    updateSection(
                      index,
                      "limit",
                      Number(e.target.value)
                    )
                  }
                  className="text-black"
                />

                {locked && (
                  <p className="text-xs text-danger">
                    Locked (expenses exist)
                  </p>
                )}
              </div>
            );
          })}

          <button
            onClick={addSection}
            className="text-glow"
          >
            + Add Budget Division
          </button>
        </div>

        {/* PIE */}
        <div className="bg-surface p-4 rounded-xl">
          <ResponsiveContainer height={280}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                innerRadius={60}
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

          <p
            className={`mt-4 text-sm ${
              isOverAllocated
                ? "text-danger"
                : "text-textSecondary"
            }`}
          >
            Allocated ₹{totalAllocated} / ₹
            {plan.income}
          </p>
        </div>
      </div>
    </div>
  );
}
