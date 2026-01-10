import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchMonthlyPlan,
  saveMonthlyPlan,
  copyLastMonth,
  fetchLockedSections,
} from "../../api/budget.api";

export const useMonthlyPlan = (month) => {
  const qc = useQueryClient();

  const planQuery = useQuery({
    queryKey: ["monthly-plan", month],
    queryFn: () => fetchMonthlyPlan(month),
  });

  const lockedQuery = useQuery({
    queryKey: ["locked-sections", month],
    queryFn: () => fetchLockedSections(month),
  });

  const saveMutation = useMutation({
    mutationFn: saveMonthlyPlan,
    onSuccess: () => {
      qc.invalidateQueries(["monthly-plan", month]);
      qc.invalidateQueries(["dashboard", month]);
      qc.invalidateQueries(["budget", month]);
    },
  });

  const copyMutation = useMutation({
    mutationFn: copyLastMonth,
    onSuccess: () =>
      qc.invalidateQueries(["monthly-plan", month]),
  });

  return {
    plan: planQuery.data,
    lockedSections: lockedQuery.data || [],
    savePlan: saveMutation.mutate,
    copyLastMonth: copyMutation.mutate,
    isLoading:
      planQuery.isLoading || lockedQuery.isLoading,
  };
};
