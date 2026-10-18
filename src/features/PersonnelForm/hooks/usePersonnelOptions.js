import { useQuery } from "@tanstack/react-query";
import { personnelApi } from "../../ViewPersonnel/api/personnelApi";

export function usePersonnelOptions() {
  return useQuery({
    queryKey: ["personnel-options"],
    queryFn: personnelApi.getOptions,
    staleTime: 10 * 60_000,
  });
}
