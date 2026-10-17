import { useTranslation } from "react-i18next";
import { useRecentScans } from "../hooks/useGate";
import GlassCard from "../../../shared/components/ui/GlassCard";

export default function RecentScans() {
  const { t } = useTranslation();
  const { data = [], isPending } = useRecentScans(3);
  const timeFormat = new Intl.DateTimeFormat(t("locale"), {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const formatTime = (value) => {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? "--:--" : timeFormat.format(date);
  };

  return (
    <GlassCard className="space-y-4">
      <h2 className="text-lg font-semibold text-gate-control-light-text-primary dark:text-gate-control-dark-text-primary">
        {t("gateCheck.recent.title")}
      </h2>

      {isPending ? (
        <p className="text-sm text-gate-control-light-text-secondary dark:text-gate-control-dark-text-secondary">
          —
        </p>
      ) : data.length === 0 ? (
        <p className="text-sm text-gate-control-light-text-secondary dark:text-gate-control-dark-text-secondary">
          {t("gateCheck.recent.empty")}
        </p>
      ) : (
        <ul className="space-y-3 text-sm text-gate-control-light-text-primary dark:text-gate-control-dark-text-primary">
          {data.map((scan) => (
            <li key={scan.id}>
              {formatTime(scan.time)} · {scan.name} ·{" "}
              {t(`gateCheck.direction.${scan.direction}`, {
                defaultValue: scan.direction,
              })}
            </li>
          ))}
        </ul>
      )}
    </GlassCard>
  );
}
