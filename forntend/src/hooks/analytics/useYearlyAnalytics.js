import { useQuery } from "@tanstack/react-query";
import { fetchYearlyAnalytics } from "../../api/analytics.api";

export const useYearlyAnalytics = (year) =>
  useQuery({
    queryKey: ["yearly-analytics", year],
    queryFn: () => fetchYearlyAnalytics(year),
  });
