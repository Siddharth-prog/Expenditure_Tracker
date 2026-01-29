import { useQuery } from "@tanstack/react-query";
import api from "../../api/axios";

export const useTripsSummary = (tripId) =>
  useQuery({
    queryKey: ["trip-summary", tripId],
    queryFn: async () => {
      const res = await api.get(`/trips/${tripId}/summary`);
      return res.data;
    },
    enabled: !!tripId,
  });
