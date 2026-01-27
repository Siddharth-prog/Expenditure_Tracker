import { useMutation, useQueryClient } from "@tanstack/react-query";
import { endTrip } from "../../api/trip.api";

export const useEndTrip = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: endTrip,
    onSuccess: () => {
      qc.invalidateQueries(["trips"]);
    },
  });
};
