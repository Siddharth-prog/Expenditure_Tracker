// src/components/expenses/ExpenseList.jsx
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchExpenses } from "../../api/expense.api";
import { QK } from "../../constants/queryKeys";
import { groupByDay } from "../../utils/groupExpenses";
import ExpenseRow from "./ExpenseRow";

export default function ExpenseList({ month }) {
  const [openDays, setOpenDays] = useState({});

  const { data: expenses = [] } = useQuery({
    queryKey: QK.expenses(month),
    queryFn: () => fetchExpenses(month),
  });

  const grouped = groupByDay(expenses);

  const toggle = (day) =>
    setOpenDays((p) => ({ ...p, [day]: !p[day] }));

  return (
    <div className="space-y-4">
      {Object.entries(grouped).map(([day, list]) => (
        <div key={day} className="bg-surface p-4 rounded-xl">
          <button
            onClick={() => toggle(day)}
            className="font-semibold text-left w-full"
          >
            {new Date(day).toDateString()} ({list.length})
          </button>

          {openDays[day] && (
            <div className="mt-3 space-y-2">
              {list.map((e) => (
                <ExpenseRow key={e._id} expense={e} month={month} />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
