import SectionHeader from "./SectionHeader";
import BudgetProgress from "./BudgetProgress";
import CategoryList from "./CategoryList";

export default function BudgetSectionCard({
  section,
  onUpdateLimit,
}) {
  /* 🛑 HARD GUARD — NEVER REMOVE */
  if (
    !section ||
    !Array.isArray(section.categories)
  ) {
    return null;
  }

  const spent = section.categories.reduce(
    (sum, c) => sum + (c.spent || 0),
    0
  );

  return (
    <div className="bg-surface border border-border rounded-xl p-6">
      <SectionHeader
        sectionName={section.section}
        spent={spent}
        limit={section.limit}
      />

      <BudgetProgress spent={spent} limit={section.limit} />

      <input
        type="range"
        min="5000"
        max="50000"
        step="1000"
        value={section.limit}
        onChange={(e) =>
          onUpdateLimit?.(
            section.section,
            Number(e.target.value)
          )
        }
        className="w-full my-4"
      />

      <CategoryList categories={section.categories} />
    </div>
  );
}
