import { useMutation, useQueryClient } from "@tanstack/react-query";
import { rejectAIExpense } from "../../api/aiExpense.api";
import { QK } from "../../constants/queryKeys";

export const useRejectAIExpense = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: rejectAIExpense,

    onSuccess: (_, id) => {
      qc.setQueryData(QK.aiPending, (old = []) =>
        old.filter((e) => e._id !== id)
      );
    },
  });
};
