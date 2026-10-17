import { useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { LuSearchX, LuTriangleAlert, LuUsers } from "react-icons/lu";
import GlassCard from "../../../shared/components/ui/GlassCard";
import StateMessage from "../../../shared/components/ui/StateMessage";
import Button from "../../../shared/components/ui/Button";
import PersonnelRow from "./PersonnelRow";
import TableSkeleton from "./TableSkeleton";
import TablePagination from "./TablePagination";
import DeletePersonnelModal from "./DeletePersonnelModal";
import {
  useFilteredPersonnel,
  usePersonnel,
  usePersonnelCounts,
} from "../hooks/usePersonnel";
import { resetFilters, setPage } from "../../../store/personnelSlice";
import { PAGE_SIZE } from "../utils/pagination";

const COLUMNS = ["name", "rank", "unit", "plate", "status", "actions"];

export default function PersonnelTable() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { isPending, isError, refetch } = usePersonnel();
  const { total: totalPersonnel } = usePersonnelCounts();
  const filtered = useFilteredPersonnel();
  const page = useSelector((state) => state.personnel.page);
  const hasFilters = useSelector((state) =>
    Boolean(
      state.personnel.search ||
      state.personnel.unit ||
      state.personnel.rank ||
      state.personnel.status,
    ),
  );
  const [personToDelete, setPersonToDelete] = useState(null);
  const closeModal = useCallback(() => setPersonToDelete(null), []);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);

  const rows = useMemo(
    () =>
      filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE),
    [filtered, currentPage],
  );

  const showRows = !isPending && !isError && rows.length > 0;

  return (
    <>
      <GlassCard padded={false} className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[56rem] text-left text-sm ">
            <thead className="bg-gate-control-light-surface-selected dark:bg-gate-control-dark-surface-selected  ">
              <tr className="rounded-control">
                {COLUMNS.map((column) => (
                  <th
                    key={column}
                    scope="col"
                    className="px-6 py-4 text-xs font-medium text-gate-control-light-text-secondary dark:text-gate-control-dark-text-secondary first:rounded-tl-control last:rounded-tr-control"
                  >
                    {t(`personnelList.columns.${column}`)}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {isPending && <TableSkeleton columns={COLUMNS.length} />}

              {isError && (
                <tr>
                  <td colSpan={COLUMNS.length}>
                    <StateMessage
                      icon={LuTriangleAlert}
                      tone="warning"
                      title={t("personnelList.states.errorTitle")}
                      description={t("personnelList.states.errorText")}
                    >
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={() => refetch()}
                      >
                        {t("personnelList.states.retry")}
                      </Button>
                    </StateMessage>
                  </td>
                </tr>
              )}

              {!isPending && !isError && rows.length === 0 && (
                <tr>
                  <td colSpan={COLUMNS.length}>
                    {totalPersonnel === 0 ? (
                      <StateMessage
                        icon={LuUsers}
                        title={t("personnelList.states.emptyDbTitle")}
                        description={t("personnelList.states.emptyDbText")}
                      />
                    ) : (
                      <StateMessage
                        icon={LuSearchX}
                        title={t("personnelList.states.emptyTitle")}
                        description={t("personnelList.states.emptyText")}
                      >
                        {hasFilters && (
                          <Button
                            type="button"
                            variant="secondary"
                            onClick={() => dispatch(resetFilters())}
                          >
                            {t("personnelList.filters.clear")}
                          </Button>
                        )}
                      </StateMessage>
                    )}
                  </td>
                </tr>
              )}

              {showRows &&
                rows.map((person) => (
                  <PersonnelRow
                    key={person.id}
                    person={person}
                    onDelete={setPersonToDelete}
                  />
                ))}
            </tbody>
          </table>
        </div>

        {showRows && (
          <TablePagination
            page={currentPage}
            totalPages={totalPages}
            total={filtered.length}
            pageSize={PAGE_SIZE}
            onPageChange={(next) => dispatch(setPage(next))}
          />
        )}
      </GlassCard>

      {personToDelete && (
        <DeletePersonnelModal person={personToDelete} onClose={closeModal} />
      )}
    </>
  );
}
