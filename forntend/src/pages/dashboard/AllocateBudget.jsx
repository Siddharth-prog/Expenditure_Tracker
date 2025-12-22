import DashboardNavbar from "../../components/dashboard/DashboardNavbar";
import BudgetSectionCard from "../../components/dashboard/BudgetSectionCard";
import { useBudgets } from "../../hooks/budget/useBudgets";

export default function AllocateBudget() {
  const { sections, isLoading, isError, updateLimit } = useBudgets();

  if (isLoading) {
    return <p className="p-6">Loading budget data…</p>;
  }

  if (isError) {
    return <p className="p-6">Failed to load budget data</p>;
  }

  return (
    <div className="bg-bg min-h-screen">
      <DashboardNavbar />

      <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-textPrimary">
          Budget Allocation
        </h2>

        {sections.length === 0 ? (
          <p className="text-textMuted text-sm">
            No budget divisions defined for this month.
            <br />
            Please create a Monthly Plan first.
          </p>
        ) : (
          sections.map((sec) => (
            <BudgetSectionCard
              key={sec.section}
              section={sec}
              onUpdateLimit={updateLimit}
            />
          ))
        )}
      </div>
    </div>
  );
}
