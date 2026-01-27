import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTripExpense } from "../../api/trip.api";

export const useAddTripExpense = (tripId) => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data) => addTripExpense(tripId, data),
    onSuccess: () => {
      qc.invalidateQueries(["trip-expenses", tripId]);
      qc.invalidateQueries(["trip-summary", tripId]);
    },
  });
};
