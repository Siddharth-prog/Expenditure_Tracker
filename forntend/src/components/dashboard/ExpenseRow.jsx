export default function ExpenseRow({ expense, onEdit, onDelete }) {
  return (
    <div className="flex justify-between items-center text-sm py-2 border-b border-border">
      <div>
        <p className="font-medium text-textPrimary">
          {expense.title}
        </p>
        <p className="text-xs text-textMuted">
          {expense.category} • {expense.section}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <span className="font-semibold">
          ₹{expense.amount}
        </span>

        <button
          onClick={() => onEdit?.(expense)}
          className="text-xs text-glow"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete?.(expense._id)}
          className="text-xs text-danger"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
