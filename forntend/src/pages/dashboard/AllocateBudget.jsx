import DashboardNavbar from '../../components/dashboard/DashboardNavbar';
import BudgetSectionCard from '../../components/dashboard/BudgetSectionCard';
import { useBudgets } from '../../hooks/budget/useBudgets.js';

export default function AllocateBudget() {
  const month = new Date().toISOString().slice(0, 7);

  const { plan, sections, savePlan, isLoading, isError } = useBudgets(month);

  if (isLoading) return <p className="p-6">Loading budget data…</p>;
  if (isError) return <p className="p-6">Failed to load budget data</p>;
  if (!plan) return null;

  /* ---------- UPDATE SECTION LIMIT (SAFE) ---------- */
  const updateLimit = (sectionName, newLimit) => {
    const updatedSections = plan.sections.map((s) =>
      s.section === sectionName ? { ...s, limit: newLimit } : s
    );

    const totalAllocated = updatedSections.reduce((sum, s) => sum + s.limit, 0);

    // 🛑 Guard: prevent over-allocation
    if (totalAllocated > plan.income) {
      return;
    }

    savePlan({
      month,
      income: plan.income,
      sections: updatedSections,
    });
  };

  return (
    <div className="bg-bg min-h-screen">
      <DashboardNavbar />

      <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
        <h2 className="text-2xl font-semibold">Budget Allocation</h2>

        {sections.length === 0 ? (
          <p className="text-textMuted text-sm">
            No budget divisions defined.
            <br />
            Please create a Monthly Plan first.
          </p>
        ) : (
          sections.map((sec) => (
            <BudgetSectionCard key={sec.section} section={sec} onCommitLimit={updateLimit} />
          ))
        )}
      </div>
    </div>
  );
}
