import DashboardNavbar from "../../components/dashboard/DashboardNavbar";
import BudgetSectionCard from "../../components/dashboard/BudgetSectionCard";
import AddSectionForm from "../../components/dashboard/AddSectionForm";
import { useBudgets } from "../../hooks/budget/useBudgets";

export default function AllocateBudget() {
  const {
    sections,
    addSection,
    deleteSection,
    updateLimit,
  } = useBudgets();

  return (
    <div className="bg-bg min-h-screen">
      {/* NAVBAR */}
      <DashboardNavbar />

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <h2 className="text-2xl font-semibold">
          Budget Allocation
        </h2>

        {/* ADD NEW SECTION */}
        <AddSectionForm onAdd={addSection} />

        {/* BUDGET SECTIONS */}
        {sections.length === 0 ? (
          <p className="text-textMuted text-sm">
            No budget sections created yet.
          </p>
        ) : (
          sections.map((sec) => (
            <BudgetSectionCard
              key={sec.section}      // ✅ stable key
              section={sec}          // ✅ NEVER sections[index]
              onDelete={deleteSection}
              onUpdateLimit={updateLimit}
            />
          ))
        )}
      </div>
    </div>
  );
}
