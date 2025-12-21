export default function CategoryList({ categories }) {
  if (!categories.length) {
    return (
      <p className="text-sm text-textMuted">
        No expenses recorded yet.
      </p>
    );
  }

  return (
    <div className="space-y-2 mt-3">
      {categories.map((cat) => (
        <div
          key={cat.name}
          className="flex justify-between items-center bg-bg rounded-lg p-3 text-sm"
        >
          <span>{cat.name}</span>
          <span>₹{cat.spent}</span>
        </div>
      ))}
    </div>
  );
}
