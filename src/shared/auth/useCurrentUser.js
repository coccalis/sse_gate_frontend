import { useQuery } from "@tanstack/react-query";
import { authApi } from "./authApi";

export const CURRENT_USER_KEY = ["operator", "me"];

// The signed-in user: { id, name, email, role }.
// IMPORTANT: after login call queryClient.invalidateQueries({ queryKey: CURRENT_USER_KEY })
// and on logout call queryClient.clear(), so one person's cached data
// never shows up for the next one on the same browser tab.
export function useCurrentUser() {
  return useQuery({
    queryKey: CURRENT_USER_KEY,
    queryFn: authApi.getMe,
    staleTime: 5 * 60_000,
    retry: false,
    refetchOnWindowFocus: false,
  });
}
