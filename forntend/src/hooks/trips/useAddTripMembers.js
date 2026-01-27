import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api/axios";

export const useAddTripMember = (tripId) => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (name) =>
      api.post(`/trips/${tripId}/members`, { name }),

    onSuccess: () => {
      qc.invalidateQueries(["trip", tripId]);
    },
  });
};
