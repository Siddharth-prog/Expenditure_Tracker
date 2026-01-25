import { useMutation, useQueryClient } from "@tanstack/react-query";
import { approveAIExpense } from "../../api/aiExpense.api";
import { QK } from "../../constants/queryKeys";

export const useApproveAIExpense = (month) => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: approveAIExpense,

    onMutate: async (id) => {
      const prev = qc.getQueryData(QK.aiPending);

      qc.setQueryData(QK.aiPending,
        prev.filter((e) => e._id !== id)
      );

      return { prev };
    },

    onError: (_, __, ctx) => {
      qc.setQueryData(QK.aiPending, ctx.prev);
    },

    onSuccess: () => {
      qc.invalidateQueries(QK.expenses(month));
      qc.invalidateQueries(QK.dashboard(month));
      qc.invalidateQueries(QK.monthlyPlan(month));
    },
  });
};
