import { useQuery } from "@tanstack/react-query";
import { fetchDailyAnalytics } from "../../api/analytics.api";

export const useDailyAnalytics = (month) =>
  useQuery({
    queryKey: ["daily-analytics", month],
    queryFn: () => fetchDailyAnalytics(month),
  });
