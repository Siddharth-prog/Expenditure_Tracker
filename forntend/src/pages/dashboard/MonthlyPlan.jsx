import { useEffect, useMemo, useState, memo } from 'react';
import DashboardNavbar from '../../components/dashboard/DashboardNavbar';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { useMonthlyPlan } from '../../hooks/budget/useMonthlyPlan';

const COLORS = ['#7C7CFF', '#34D399', '#FBBF24', '#F87171'];

/* -------- MEMOIZED PIE -------- */
const BudgetPie = memo(function BudgetPie({ data }) {
  return (
    <ResponsiveContainer height={280}>
      <PieChart>
        <Pie data={data} dataKey="value" innerRadius={60}>
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
});

export default function MonthlyPlan() {
  const month = new Date().toISOString().slice(0, 7);

  /* -------- ALL HOOKS FIRST -------- */
  const { plan, savePlan, isLoading } = useMonthlyPlan(month);

  const [draft, setDraft] = useState({
    income: 0,
    sections: [],
  });

  useEffect(() => {
    if (plan) {
      setDraft(plan);
    }
  }, [plan]);

  const pieData = useMemo(() => {
    return draft.sections.map((s) => ({
      name: s.section || 'Unnamed',
      value: s.limit,
    }));
  }, [draft.sections]);

  /* -------- CONDITIONAL RENDER AFTER HOOKS -------- */
  if (isLoading) {
    return <p className="p-6">Loading…</p>;
  }

  /* -------- DRAFT HELPERS -------- */
  const updateIncomeDraft = (value) => {
    setDraft((p) => ({ ...p, income: value }));
  };

  const updateSectionDraft = (index, key, value) => {
    setDraft((p) => {
      const updated = [...p.sections];
      updated[index] = { ...updated[index], [key]: value };
      return { ...p, sections: updated };
    });
  };

  const addSection = () => {
    const updated = {
      ...draft,
      sections: [...draft.sections, { section: '', limit: 0 }],
    };
    setDraft(updated);
    savePlan({ month, ...updated });
  };

  return (
    <div className="bg-bg min-h-screen">
      <DashboardNavbar />

      <div className="max-w-6xl mx-auto p-6 space-y-6">
        <h2 className="text-2xl font-semibold">Monthly Budget Plan</h2>

        {/* INCOME */}
        <div className="bg-surface p-4 rounded-xl">
          <label className="text-sm">Monthly Income</label>
          <input
            type="number"
            value={draft.income}
            onChange={(e) => updateIncomeDraft(Number(e.target.value) || 0)}
            onBlur={() => savePlan({ month, ...draft })}
            className="text-black mt-2"
          />
        </div>

        {/* SECTIONS */}
        <div className="bg-surface p-4 rounded-xl space-y-4">
          <h3 className="font-semibold">Budget Divisions</h3>

          {draft.sections.map((s, i) => (
            <div key={i} className="grid sm:grid-cols-2 gap-3">
              <input
                value={s.section}
                onChange={(e) => updateSectionDraft(i, 'section', e.target.value)}
                onBlur={() => savePlan({ month, ...draft })}
                className="text-black"
                placeholder="Section name"
              />
              <input
                type="number"
                value={s.limit}
                onChange={(e) => updateSectionDraft(i, 'limit', Number(e.target.value) || 0)}
                onBlur={() => savePlan({ month, ...draft })}
                className="text-black"
                placeholder="Limit"
              />
            </div>
          ))}

          <button onClick={addSection} className="text-glow">
            + Add Budget Division
          </button>
        </div>

        {/* PIE */}
        {draft.sections.length > 0 && (
          <div className="bg-surface p-4 rounded-xl">
            <BudgetPie data={pieData} />
          </div>
        )}
      </div>
    </div>
  );
}
