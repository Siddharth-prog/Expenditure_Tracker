import { useQuery } from "@tanstack/react-query";
import api from "../../api/axios";

export const useDashboard = (month) =>
  useQuery({
    queryKey: ["dashboard", month],
    queryFn: async () => {
      const res = await api.get("/dashboard", {
        params: { month },
      });
      return res.data;
    },
    enabled: !!month,
  });
