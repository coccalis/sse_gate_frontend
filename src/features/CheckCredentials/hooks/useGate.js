import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { gateApi } from "../api/gateApi";
import { setResult } from "../../../store/checkSlice";

const GATE_KEY = ["gate"];

export function useGateStatus() {
  return useQuery({
    queryKey: [...GATE_KEY, "status"],
    queryFn: gateApi.getStatus,
    refetchInterval: 15_000,
  });
}

// "checking" | "connected" | "disconnected"
export function useReaderState() {
  const { data, isPending, isError } = useGateStatus();
  if (isPending) return "checking";
  if (isError || !data?.readerConnected) return "disconnected";
  return "connected";
}

export function useRecentScans(limit = 3) {
  return useQuery({
    queryKey: [...GATE_KEY, "recent-scans", limit],
    queryFn: () => gateApi.getRecentScans(limit),
    refetchInterval: 30_000,
  });
}

// Shared by card scan and plate check: puts the outcome in the store (so the
// result panel can show it) and refreshes the counters and the recent list.
function useCheckMutation(mutationFn) {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onSuccess: (result) => {
      dispatch(setResult(result));
      queryClient.invalidateQueries({ queryKey: GATE_KEY });
    },
    onError: () => dispatch(setResult({ status: "error" })),
  });
}

export const useScanCard = () =>
  useCheckMutation(({ cardId, direction }) =>
    gateApi.scanCard(cardId, direction),
  );

export const useCheckPlate = () =>
  useCheckMutation(({ plate, direction }) =>
    gateApi.checkPlate(plate, direction),
  );
