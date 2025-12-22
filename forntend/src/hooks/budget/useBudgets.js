import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchExpenses,  fetchMonthlyPlan,
  updateSectionLimit } from "../../service/expense.service.js";
  

export function useBudgets() {
  const queryClient = useQueryClient();

  /* ---------- FETCH MONTHLY PLAN ---------- */
  const monthlyPlanQuery = useQuery({
    queryKey: ["monthly-plan"],
    queryFn: fetchMonthlyPlan,
  });

  /* ---------- FETCH EXPENSES ---------- */
  const expensesQuery = useQuery({
    queryKey: ["expenses"],
    queryFn: fetchExpenses,
  });

  const isLoading =
    monthlyPlanQuery.isLoading || expensesQuery.isLoading;
  const isError =
    monthlyPlanQuery.isError || expensesQuery.isError;

  /* ---------- MERGE DATA ---------- */
  const sections = (() => {
    if (!monthlyPlanQuery.data || !expensesQuery.data) return [];

    const { divisions } = monthlyPlanQuery.data;
    const expenses = expensesQuery.data;

    return divisions.map((div) => {
      const divisionExpenses = expenses.filter(
        (e) => e.division === div.name
      );

      const spent = divisionExpenses.reduce(
        (sum, e) => sum + e.amount,
        0
      );

      const categoriesMap = {};
      divisionExpenses.forEach((e) => {
        categoriesMap[e.category] ??= {
          name: e.category,
          spent: 0,
        };
        categoriesMap[e.category].spent += e.amount;
      });

      return {
        section: div.name,
        allocated: div.allocated,
        spent,
        remaining: div.allocated - spent,
        categories: Object.values(categoriesMap),
      };
    });
  })();

  /* ---------- UPDATE LIMIT ---------- */
  const updateLimitMutation = useMutation({
    mutationFn: updateSectionLimit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["monthly-plan"] });
    },
  });

  const updateLimit = (section, limit) => {
    updateLimitMutation.mutate({ section, limit });
  };

  return {
    sections,
    isLoading,
    isError,
    updateLimit,
  };
}
