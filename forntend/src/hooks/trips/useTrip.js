import { useQuery } from "@tanstack/react-query";
import api from "../../api/axios";

export const useTrip = (tripId) =>
  useQuery({
    queryKey: ["trip", tripId],
    queryFn: async () => {
      const res = await api.get(`/trips/${tripId}`);
      return res.data;
    },
    enabled: !!tripId, 
  });
