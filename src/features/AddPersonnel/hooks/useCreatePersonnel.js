import { useMutation, useQueryClient } from "@tanstack/react-query";
import { personnelApi } from "../../ViewPersonnel/api/personnelApi";

export function useCreatePersonnel() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: personnelApi.create,

    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["personnel"] }),
  });
}
