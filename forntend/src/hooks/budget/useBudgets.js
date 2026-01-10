// src/hooks/budget/useBudgets.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchMonthlyPlan, saveMonthlyPlan } from "../../api/budget.api";
import { fetchExpenses } from "../../api/expense.api";

export function useBudgets(month) {
  const qc = useQueryClient();

  /* ---------- FETCH PLAN ---------- */
  const planQuery = useQuery({
    queryKey: ["monthly-plan", month],
    queryFn: () => fetchMonthlyPlan(month),
    enabled: !!month,
  });

  /* ---------- FETCH EXPENSES ---------- */
  const expensesQuery = useQuery({
    queryKey: ["expenses", month],
    queryFn: () => fetchExpenses(month),
    enabled: !!month,
  });

  /* ---------- SAVE PLAN ---------- */
  const saveMutation = useMutation({
    mutationFn: saveMonthlyPlan,
    onSuccess: () => {
      qc.invalidateQueries(["monthly-plan", month]);
      qc.invalidateQueries(["dashboard", month]);
      qc.invalidateQueries(["expenses", month]);
    },
  });

  const plan = planQuery.data;
  const expenses = expensesQuery.data || [];

  /* ---------- MERGE SECTIONS ---------- */
  const sections =
    plan?.sections.map((sec) => {
      const sectionExpenses = expenses.filter(
        (e) => e.section === sec.section
      );

      const spent = sectionExpenses.reduce(
        (s, e) => s + e.amount,
        0
      );

      const categories = {};
      sectionExpenses.forEach((e) => {
        if (!e.category) return;
        categories[e.category] ??= { name: e.category, spent: 0 };
        categories[e.category].spent += e.amount;
      });

      return {
        section: sec.section,
        limit: sec.limit,
        spent,
        categories: Object.values(categories),
      };
    }) || [];

  /* ---------- ✅ updateLimit (THIS WAS MISSING) ---------- */
  const updateLimit = (sectionName, newLimit) => {
    if (!plan) return;

    const updatedSections = plan.sections.map((s) =>
      s.section === sectionName ? { ...s, limit: newLimit } : s
    );

    saveMutation.mutate({
      month,
      income: plan.income,
      sections: updatedSections,
    });
  };

  return {
    plan,
    sections,
    updateLimit,   // ✅ NOW PRESENT
    savePlan: saveMutation.mutate,
    isLoading: planQuery.isLoading || expensesQuery.isLoading,
    isError: planQuery.isError || expensesQuery.isError,
  };
}
