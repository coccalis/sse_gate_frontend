import { useQuery } from "@tanstack/react-query";
import { personnelApi } from "../../ViewPersonnel/api/personnelApi";

export const personKey = (id) => ["personnel", "detail", String(id)];

export function usePerson(id) {
  return useQuery({
    queryKey: personKey(id),
    queryFn: () => personnelApi.getById(id),
    gcTime: 0,
    refetchOnWindowFocus: false,
    retry: (failureCount, error) => error?.status !== 404 && failureCount < 1,
  });
}
