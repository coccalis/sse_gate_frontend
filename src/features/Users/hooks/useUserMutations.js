import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usersApi } from "../api/usersApi";
import { USERS_KEY } from "../constants";
import { CURRENT_USER_KEY } from "../../../shared/auth/useCurrentUser";

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: usersApi.create,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: USERS_KEY }),
  });
}

export function useUpdateUser(id) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => usersApi.update(id, payload),
    onSuccess: async () => {
      // the signed-in user's name may have changed (it shows in the sidebar)
      queryClient.invalidateQueries({ queryKey: CURRENT_USER_KEY });
      // refetch the list BEFORE going back to it, so old data never flashes;
      // `exact` leaves the detail query of the edit page alone
      await queryClient.invalidateQueries({
        queryKey: USERS_KEY,
        exact: true,
        refetchType: "all",
      });
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => usersApi.remove(id),
    onSuccess: (_, id) => {
      queryClient.setQueryData(USERS_KEY, (old) => old?.filter((user) => user.id !== id));
      queryClient.invalidateQueries({ queryKey: USERS_KEY });
    },
  });
}
