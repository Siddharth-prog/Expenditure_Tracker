// src/components/expenses/ExpenseList.jsx
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchExpenses } from '../../api/expense.api';
import { QK } from '../../constants/queryKeys';
import { groupByDay } from '../../utils/groupExpenses';

import ExpenseRow from './ExpenseRow';
import EditExpenseForm from './EditExpenseForm';
import { useDeleteExpense } from '../../hooks/expense/useDeleteExpense';

export default function ExpenseList({ month }) {
  const [openDays, setOpenDays] = useState({});
  const [editing, setEditing] = useState(null);

  const { data: expenses = [] } = useQuery({
    queryKey: QK.expenses(month),
    queryFn: () => fetchExpenses(month),
  });

  const { mutate: deleteExpense } = useDeleteExpense(month);

  const grouped = groupByDay(expenses);

  const toggle = (day) => setOpenDays((p) => ({ ...p, [day]: !p[day] }));

  return (
    <div className="space-y-4">
      {Object.entries(grouped).map(([day, list]) => (
        <div key={day} className="bg-surface p-4 rounded-xl">
          <button onClick={() => toggle(day)} className="font-semibold text-left w-full">
            {new Date(day).toDateString()} ({list.length})
          </button>

          {openDays[day] && (
            <div className="space-y-2 mt-3">
              {list.map(
                (
                  expense // ✅ USE list, NOT expenses
                ) =>
                  editing?._id === expense._id ? (
                    <EditExpenseForm
                      key={expense._id}
                      expense={expense}
                      month={month}
                      onClose={() => setEditing(null)}
                    />
                  ) : (
                    <ExpenseRow
                      key={expense._id}
                      expense={expense}
                      onEdit={() => setEditing(expense)}
                      onDelete={deleteExpense}
                    />
                  )
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
