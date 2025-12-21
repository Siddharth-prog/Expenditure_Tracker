import { expenses } from "../../data/dummyFinanceData";

export default function ExpenseList() {
  return (
    <div className="bg-surface border border-border rounded-xl p-5 overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="text-textMuted">
          <tr>
            <th className="text-left py-2">Title</th>
            <th>Category</th>
            <th>Date</th>
            <th>Amount</th>
          </tr>
        </thead>

        <tbody>
          {expenses.map((e) => (
            <tr key={e.id} className="border-t border-border">
              <td className="py-2">{e.title}</td>
              <td>{e.category}</td>
              <td>{e.date}</td>
              <td className="text-right">₹{e.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
