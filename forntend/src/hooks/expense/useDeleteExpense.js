// src/hooks/expense/useDeleteExpense.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteExpense } from "../../api/expense.api";
import { QK } from "../../constants/queryKeys";

export const useDeleteExpense = (month) => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: deleteExpense,

    onMutate: async (id) => {
      const prev = qc.getQueryData(QK.expenses(month));
      qc.setQueryData(QK.expenses(month),
        prev.filter((e) => e._id !== id)
      );
      return { prev };
    },

    onError: (_, __, ctx) => {
      qc.setQueryData(QK.expenses(month), ctx.prev);
    },

    onSettled: () => {
      qc.invalidateQueries(QK.dashboard(month));
      qc.invalidateQueries(QK.monthlyPlan(month));
    },
  });
};
