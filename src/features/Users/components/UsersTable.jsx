import { useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { LuSearchX, LuTriangleAlert, LuUsers } from "react-icons/lu";
import GlassCard from "../../../shared/components/ui/GlassCard";
import StateMessage from "../../../shared/components/ui/StateMessage";
import Button from "../../../shared/components/ui/Button";
import Pagination from "../../../shared/components/ui/Pagination";
import { useCurrentUser } from "../../../shared/auth/useCurrentUser";
import UserRow from "./UserRow";
import UsersTableSkeleton from "./UsersTableSkeleton";
import DeleteUserModal from "./DeleteUserModal";
import { useFilteredUsers, useUserCounts, useUsers } from "../hooks/useUsers";
import { PAGE_SIZE } from "../constants";
import { resetFilters, setPage } from "../../../store/usersSlice";

const COLUMNS = ["name", "email", "role", "lastLogin", "status", "actions"];

export default function UsersTable() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { isPending, isError, refetch } = useUsers();
  const { data: me } = useCurrentUser();
  const { total: totalUsers } = useUserCounts();
  const filtered = useFilteredUsers();
  const page = useSelector((state) => state.users.page);
  const hasFilters = useSelector((state) =>
    Boolean(state.users.search || state.users.role || state.users.status),
  );
  const [userToDelete, setUserToDelete] = useState(null);
  const closeModal = useCallback(() => setUserToDelete(null), []);

  // After deleting the last row of the last page, fall back to the new last page
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);

  const rows = useMemo(
    () =>
      filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE),
    [filtered, currentPage],
  );

  const showRows = !isPending && !isError && rows.length > 0;
  const from = (currentPage - 1) * PAGE_SIZE + 1;
  const to = Math.min(currentPage * PAGE_SIZE, filtered.length);

  return (
    <>
      <GlassCard padded={false} className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[56rem] text-left text-sm">
            <thead className="bg-gate-control-light-surface-selected dark:bg-gate-control-dark-surface-selected">
              <tr>
                {COLUMNS.map((column) => (
                  <th
                    key={column}
                    scope="col"
                    className="px-6 py-4 text-xs font-medium text-gate-control-light-text-secondary dark:text-gate-control-dark-text-secondary"
                  >
                    {t(`usersPage.columns.${column}`)}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {isPending && <UsersTableSkeleton columns={COLUMNS.length} />}

              {isError && (
                <tr>
                  <td colSpan={COLUMNS.length}>
                    <StateMessage
                      icon={LuTriangleAlert}
                      tone="warning"
                      title={t("usersPage.states.errorTitle")}
                      description={t("usersPage.states.errorText")}
                    >
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={() => refetch()}
                      >
                        {t("usersPage.states.retry")}
                      </Button>
                    </StateMessage>
                  </td>
                </tr>
              )}

              {!isPending && !isError && rows.length === 0 && (
                <tr>
                  <td colSpan={COLUMNS.length}>
                    {totalUsers === 0 ? (
                      <StateMessage
                        icon={LuUsers}
                        title={t("usersPage.states.emptyDbTitle")}
                        description={t("usersPage.states.emptyDbText")}
                      />
                    ) : (
                      <StateMessage
                        icon={LuSearchX}
                        title={t("usersPage.states.emptyTitle")}
                        description={t("usersPage.states.emptyText")}
                      >
                        {hasFilters && (
                          <Button
                            type="button"
                            variant="secondary"
                            onClick={() => dispatch(resetFilters())}
                          >
                            {t("usersPage.filters.clear")}
                          </Button>
                        )}
                      </StateMessage>
                    )}
                  </td>
                </tr>
              )}

              {showRows &&
                rows.map((user) => (
                  <UserRow
                    key={user.id}
                    user={user}
                    isSelf={user.id === me?.id}
                    onDelete={setUserToDelete}
                  />
                ))}
            </tbody>
          </table>
        </div>

        {showRows && (
          <Pagination
            page={currentPage}
            totalPages={totalPages}
            summary={t("usersPage.pagination.showing", {
              from,
              to,
              count: filtered.length,
            })}
            onPageChange={(next) => dispatch(setPage(next))}
          />
        )}
      </GlassCard>

      {userToDelete && (
        <DeleteUserModal user={userToDelete} onClose={closeModal} />
      )}
    </>
  );
}
