export default function SectionHeader({
  sectionName,
  spent,
  limit,
  onDelete,
}) {
  const exceeded = spent > limit;

  return (
    <div className="flex justify-between items-center">
      <h3 className="font-semibold">{sectionName}</h3>

      <div className="flex items-center gap-4">
        <span
          className={`text-sm ${
            exceeded ? "text-danger" : "text-textSecondary"
          }`}
        >
          ₹{spent} / ₹{limit}
        </span>

        {onDelete && (
          <button
            onClick={onDelete}
            className="text-sm text-danger hover:underline"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
