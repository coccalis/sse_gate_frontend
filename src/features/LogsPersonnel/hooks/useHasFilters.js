import { useSelector } from "react-redux";

export function useHasFilters() {
  return useSelector((state) =>
    Boolean(
      state.logs.search ||
        state.logs.plate ||
        state.logs.dateFrom ||
        state.logs.dateTo ||
        state.logs.direction
    )
  );
}
