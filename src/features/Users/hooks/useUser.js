import { useQuery } from "@tanstack/react-query";
import { usersApi } from "../api/usersApi";

// One user for the edit page. Always loaded fresh, and never refetched under a
// form being edited (the form reads its initial values once).
export function useUser(id) {
  return useQuery({
    queryKey: ["users", "detail", String(id)],
    queryFn: () => usersApi.getById(id),
    gcTime: 0,
    refetchOnWindowFocus: false,
    retry: (failureCount, error) => error?.status !== 404 && failureCount < 1,
  });
}
