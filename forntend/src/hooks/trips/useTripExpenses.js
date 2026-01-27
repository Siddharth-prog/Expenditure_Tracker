import { useQuery } from "@tanstack/react-query";
import { fetchTripExpenses } from "../../api/trip.api";

export const useTripExpenses = (tripId) =>
  useQuery({
    queryKey: ["trip-expenses", tripId],
    queryFn: () => fetchTripExpenses(tripId),
    enabled: !!tripId,
  });
