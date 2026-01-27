import { useQuery } from "@tanstack/react-query";
import api from "../../api/axios";

export const useTrip = (tripId) =>
  useQuery({
    queryKey: ["trip", tripId],
    queryFn: () =>
      api.get(`/trips/${tripId}`).then((r) => r.data),
    enabled: !!tripId,
  });
