import { useQuery } from "@tanstack/react-query";
import { fetchPendingAIExpenses } from "../../api/aiExpense.api";
import { QK } from "../../constants/queryKeys";

export const usePendingAIExpenses = () =>
  useQuery({
    queryKey: QK.aiPending,
    queryFn: fetchPendingAIExpenses,
  });
