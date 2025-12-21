export default function AddExpense() {
  return (
    <div className="bg-surface border border-border rounded-xl p-5">
      <h3 className="font-semibold mb-4">Add Expense</h3>

      {/* POST /api/expenses */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input className="input" placeholder="Title" />
        <input className="input" placeholder="Amount" type="number" />
        <select className="input">
          <option>Food</option>
          <option>Travel</option>
          <option>Shopping</option>
          <option>Utilities</option>
        </select>
        <input className="input" type="date" />
      </div>

      <button className="mt-4 w-full sm:w-auto bg-glow px-6 py-2 rounded text-bg">
        Add Expense
      </button>
    </div>
  );
}
