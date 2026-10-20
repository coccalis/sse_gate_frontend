import { useMemo } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { logsApi } from "../api/logsApi";
import { PAGE_SIZE } from "../constants";
import { useDebouncedValue } from "../../../shared/hooks/useDebouncedValue";
import { normalizePlate } from "../../CheckCredentials/utils/plate";

// eftiaxa to request edw giati mporei na exei polla rows me data pou ginontai kanonika ston server.
export function useLogs() {
  const { search, plate, dateFrom, dateTo, direction, page } = useSelector(
    (state) => state.logs,
  );

  // perimene na stamathsei na grafei
  const debouncedSearch = useDebouncedValue(search, 300);
  const debouncedPlate = useDebouncedValue(plate, 300);

  const params = useMemo(
    () => ({
      search: debouncedSearch.trim(),
      plate: normalizePlate(debouncedPlate), // XYH 4821 -> ΧΥΗ4821
      from: dateFrom,
      to: dateTo,
      direction,
      page,
      pageSize: PAGE_SIZE,
    }),
    [debouncedSearch, debouncedPlate, dateFrom, dateTo, direction, page],
  );

  return useQuery({
    queryKey: ["logs", params],
    queryFn: () => logsApi.getLogs(params),
    placeholderData: keepPreviousData, // mexri na erthoun oi kainourgies seires,deikse ta palia row
    refetchInterval: 15_000,
  });
}

export function useLastEvent(personId) {
  return useQuery({
    queryKey: ["logs", "last", personId],
    queryFn: async () => {
      const { items } = await logsApi.getLogs({
        personId,
        page: 1,
        pageSize: 1,
      });
      return items[0] ?? null;
    },
    enabled: personId != null,
    refetchInterval: 15_000,
  });
}
