import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LuPlus } from "react-icons/lu";
import Button from "../../../shared/components/ui/Button";
import StatusBadge from "../../../shared/components/ui/StatusBadge";
import { usePersonnel, usePersonnelCounts } from "../hooks/usePersonnel";

export default function PersonnelSummary() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data } = usePersonnel();
  const { total, inside, outside } = usePersonnelCounts();
  const number = new Intl.NumberFormat(t("locale"));

  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <p className="text-lg font-semibold text-gate-control-light-text-primary dark:text-gate-control-dark-text-primary">
          {data
            ? t("personnelList.summary.total", { value: number.format(total) })
            : "—"}
        </p>

        {data && (
          <>
            <StatusBadge tone="positive">
              {t("personnelList.summary.inside", {
                value: number.format(inside),
              })}
            </StatusBadge>
            <StatusBadge tone="neutral">
              {t("personnelList.summary.outside", {
                value: number.format(outside),
              })}
            </StatusBadge>
          </>
        )}
      </div>

      <Button type="button" onClick={() => navigate("/personnel/new")}>
        <LuPlus size={18} aria-hidden="true" />
        {t("personnelList.summary.add")}
      </Button>
    </div>
  );
}
