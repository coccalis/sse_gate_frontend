import { useMutation, useQueryClient } from "@tanstack/react-query";
import { personnelApi } from "../../ViewPersonnel/api/personnelApi";

export function useUpdatePersonnel(id) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => personnelApi.update(id, payload),

    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["personnel"],
        exact: true,
        refetchType: "all",
      }),
  });
}
