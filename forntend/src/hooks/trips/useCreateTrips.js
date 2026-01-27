import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTrip } from "../../api/trip.api";

export const useCreateTrip = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: createTrip,
    onSuccess: () => {
      qc.invalidateQueries(["trips"]);
    },
  });
};
