import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { LuHistory, LuSearchX, LuTriangleAlert } from "react-icons/lu";
import GlassCard from "../../../shared/components/ui/GlassCard";
import StateMessage from "../../../shared/components/ui/StateMessage";
import Button from "../../../shared/components/ui/Button";
import Pagination from "../../../shared/components/ui/Pagination";
import LogRow from "./LogRow";
import LogsTableSkeleton from "./LogsTableSkeleton";
import { useLogs } from "../hooks/useLogs";
import { useHasFilters } from "../hooks/useHasFilters";
import { PAGE_SIZE } from "../constants";
import { resetFilters, setPage } from "../../../store/logsSlice";

const COLUMNS = [
  "date",
  "time",
  "name",
  "rankUnit",
  "plate",
  "status",
  "operator",
];
const EMPTY = [];

export default function LogsTable() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const page = useSelector((state) => state.logs.page);
  const hasFilters = useHasFilters();
  const { data, isPending, isError, isPlaceholderData, refetch } = useLogs();

  const items = data?.items ?? EMPTY;
  const total = data?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);

  useEffect(() => {
    if (data && !isPlaceholderData && page > totalPages) {
      dispatch(setPage(totalPages));
    }
  }, [data, isPlaceholderData, page, totalPages, dispatch]);

  const showRows = !isPending && !isError && items.length > 0;
  const from = (currentPage - 1) * PAGE_SIZE + 1;
  const to = Math.min(currentPage * PAGE_SIZE, total);

  return (
    <GlassCard
      padded={false}
      className="overflow-hidden"
      aria-busy={isPlaceholderData}
    >
      <div
        className={`overflow-x-auto transition-opacity ${
          isPlaceholderData ? "opacity-60" : ""
        }`}
      >
        <table className="w-full min-w-[60rem] text-left text-sm">
          <thead className="bg-gate-control-light-surface-selected dark:bg-gate-control-dark-surface-selected">
            <tr>
              {COLUMNS.map((column) => (
                <th
                  key={column}
                  scope="col"
                  className="px-6 py-4 text-xs font-medium text-gate-control-light-text-secondary dark:text-gate-control-dark-text-secondary first:rounded-tl-control last:rounded-tr-control"
                >
                  {t(`logsPage.columns.${column}`)}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {isPending && <LogsTableSkeleton columns={COLUMNS.length} />}

            {isError && (
              <tr>
                <td colSpan={COLUMNS.length}>
                  <StateMessage
                    icon={LuTriangleAlert}
                    tone="warning"
                    title={t("logsPage.states.errorTitle")}
                    description={t("logsPage.states.errorText")}
                  >
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => refetch()}
                    >
                      {t("logsPage.states.retry")}
                    </Button>
                  </StateMessage>
                </td>
              </tr>
            )}

            {!isPending && !isError && items.length === 0 && (
              <tr>
                <td colSpan={COLUMNS.length}>
                  <StateMessage
                    icon={hasFilters ? LuSearchX : LuHistory}
                    title={t("logsPage.states.emptyTitle")}
                    description={t(
                      hasFilters
                        ? "logsPage.states.emptyFilteredText"
                        : "logsPage.states.emptyText",
                    )}
                  >
                    {hasFilters && (
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={() => dispatch(resetFilters())}
                      >
                        {t("logsPage.filters.clear")}
                      </Button>
                    )}
                  </StateMessage>
                </td>
              </tr>
            )}

            {showRows && items.map((log) => <LogRow key={log.id} log={log} />)}
          </tbody>
        </table>
      </div>

      {showRows && (
        <Pagination
          page={currentPage}
          totalPages={totalPages}
          summary={t("logsPage.pagination.showing", { from, to, count: total })}
          onPageChange={(next) => dispatch(setPage(next))}
        />
      )}
    </GlassCard>
  );
}
