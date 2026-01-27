import { useQuery } from "@tanstack/react-query";
import { fetchTripSummary } from "../../api/trip.api";

export const useTripsSummary = (tripId) =>
  useQuery({
    queryKey: ["trip-summary", tripId],
    queryFn: () => fetchTripSummary(tripId),
    enabled: !!tripId,
  });
