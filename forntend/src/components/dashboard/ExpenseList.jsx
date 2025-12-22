import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchExpenses, addExpense } from "../../service/expense.service"; 
export default function ExpenseList() {
  const queryClient = useQueryClient();

  const { data: expenses = [] } = useQuery({
    queryKey: ["expenses"],
    queryFn: fetchExpenses,
  });

  const mutation = useMutation({
    mutationFn: addExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      queryClient.invalidateQueries({ queryKey: ["budgets"] }); // 🔥 KEY
    },
  });

  return (
    <div className="bg-surface p-6 rounded-xl space-y-4">
      <button
        onClick={() =>
          mutation.mutate({
            amount: 800,
            category: "Food",
            section: "Lifestyle",
          })
        }
        className="bg-glow text-bg px-4 py-2 rounded-lg"
      >
        + Add Dummy Expense
      </button>

      {expenses.map((e) => (
        <div key={e.id} className="flex justify-between text-sm">
          <span>{e.category}</span>
          <span>₹{e.amount}</span>
        </div>
      ))}
    </div>
  );
}
