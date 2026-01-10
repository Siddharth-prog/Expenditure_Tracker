// src/hooks/expense/useAddExpense.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addExpense } from "../../api/expense.api";
import { QK } from "../../constants/queryKeys";

export const useAddExpense = (month) => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: addExpense,

    onMutate: async (newExpense) => {
      await qc.cancelQueries(QK.expenses(month));

      const prev = qc.getQueryData(QK.expenses(month)) || [];

      qc.setQueryData(QK.expenses(month), [
        { ...newExpense, _id: crypto.randomUUID() },
        ...prev,
      ]);

      return { prev };
    },

    onError: (_, __, ctx) => {
      qc.setQueryData(QK.expenses(month), ctx.prev);
    },

    onSettled: () => {
      qc.invalidateQueries(QK.expenses(month));
      qc.invalidateQueries(QK.dashboard(month));
      qc.invalidateQueries(QK.monthlyPlan(month));
    },
  });
};
