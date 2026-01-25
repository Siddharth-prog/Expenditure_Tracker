import { useQuery } from "@tanstack/react-query";
import { fetchMonthlyAnalytics } from "../../api/analytics.api";

export const useMonthlyAnalytics = (month) =>
  useQuery({
    queryKey: ["monthly-analytics", month],
    queryFn: () => fetchMonthlyAnalytics(month),
  });
