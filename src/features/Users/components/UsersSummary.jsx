import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LuUserRoundPlus } from "react-icons/lu";
import Button from "../../../shared/components/ui/Button";
import StatusBadge from "../../../shared/components/ui/StatusBadge";
import { useUsers, useUserCounts } from "../hooks/useUsers";

export default function UsersSummary() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data } = useUsers();
  const { total, admins, operators } = useUserCounts();

  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex flex-wrap items-center gap-3">
        {/* i18next picks "_one" or "_other" from `count` */}
        <p className="text-lg font-semibold text-gate-control-light-text-primary dark:text-gate-control-dark-text-primary">
          {data ? t("usersPage.summary.total", { count: total }) : "—"}
        </p>

        {data && (
          <>
            <StatusBadge tone="positive">
              {t("usersPage.summary.admins", { count: admins })}
            </StatusBadge>
            <StatusBadge tone="neutral">
              {t("usersPage.summary.operators", { count: operators })}
            </StatusBadge>
          </>
        )}
      </div>

      <Button type="button" onClick={() => navigate("/admin/users/new")}>
        <LuUserRoundPlus size={18} aria-hidden="true" />
        {t("usersPage.summary.add")}
      </Button>
    </div>
  );
}
