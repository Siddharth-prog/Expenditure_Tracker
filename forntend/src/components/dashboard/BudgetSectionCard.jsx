import CategoryList from "./CategoryList";
import SectionHeader from "./SectionHeader" ;
import BudgetProgress from "./BudgetProgress"
export default function BudgetSectionCard({
  section,
  onUpdateLimit,
}) {
  if (!section || !Array.isArray(section.categories)) return null;

  const spent = section.categories.reduce(
    (sum, c) => sum + (c.spent || 0),
    0
  );

  const locked = spent > 0;

  return (
    <div className="bg-surface border border-border rounded-xl p-6">
      <SectionHeader
        sectionName={section.section}
        spent={spent}
        limit={section.limit}
        locked={locked}
      />

      <BudgetProgress spent={spent} limit={section.limit} />

      <input
        type="range"
        min="1000"
        max="100000"
        step="500"
        defaultValue={section.limit}   // ✅ FIX
        disabled={locked}
        onMouseUp={(e) =>
          onUpdateLimit(section.section, Number(e.target.value))
        }
        onTouchEnd={(e) =>
          onUpdateLimit(section.section, Number(e.target.value))
        }
        className={`w-full my-4 ${
          locked ? "opacity-50 cursor-not-allowed" : ""
        }`}
      />

      {locked && (
        <p className="text-xs text-danger">
          This section is locked because expenses exist.
        </p>
      )}

      <CategoryList categories={section.categories} />
    </div>
  );
}
