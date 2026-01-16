// src/hooks/expense/useEditExpense.js
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateExpense } from '../../api/expense.api';
import { QK } from '../../constants/queryKeys';

export const useEditExpense = (month) => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: updateExpense,

    onMutate: async ({ id, data }) => {
      await qc.cancelQueries(QK.expenses(month));

      const prev = qc.getQueryData(QK.expenses(month)) || [];

      qc.setQueryData(QK.expenses(month), (old = []) =>
        old.map((e) => (e._id === id ? { ...e, ...data } : e))
      );

      return { prev };
    },

    onError: (_, __, ctx) => {
      if (ctx?.prev) {
        qc.setQueryData(QK.expenses(month), ctx.prev);
      }
    },

    onSettled: () => {
      qc.invalidateQueries(QK.expenses(month));
      qc.invalidateQueries(QK.dashboard(month));
      qc.invalidateQueries(QK.monthlyPlan(month));
    },
  });
};
