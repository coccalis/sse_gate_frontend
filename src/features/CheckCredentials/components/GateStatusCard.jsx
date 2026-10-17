import { useTranslation } from "react-i18next";
import { useGateStatus, useReaderState } from "../hooks/useGate";
import GlassCard from "../../../shared/components/ui/GlassCard";
import StatusBadge from "../../../shared/components/ui/StatusBadge";

const READER_BADGES = {
  checking: { tone: "neutral", key: "checking" },
  connected: { tone: "positive", key: "connected" },
  disconnected: { tone: "warning", key: "disconnected" },
};

export default function GateStatusCard() {
  const { t } = useTranslation();
  const { data } = useGateStatus();
  const reader = READER_BADGES[useReaderState()];
  const number = new Intl.NumberFormat(t("locale"));

  return (
    <GlassCard className="space-y-5">
      <h2 className="text-lg font-semibold text-gate-control-light-text-primary dark:text-gate-control-dark-text-primary">
        {t("gate")}
      </h2>

      <StatusBadge tone={reader.tone}>
        {t(`gateCheck.reader.${reader.key}`)}
      </StatusBadge>

      <hr className="border-gate-control-light-border-subtle dark:border-gate-control-dark-border-subtle" />

      <div className="space-y-3">
        <p className="text-sm font-semibold text-gate-control-light-text-primary dark:text-gate-control-dark-text-primary">
          {t("gateCheck.status.traffic")}
        </p>
        <p className="text-4xl font-semibold text-gate-control-light-text-primary dark:text-gate-control-dark-text-primary">
          {data
            ? t("gateCheck.status.inside", {
                value: number.format(data.inside),
              })
            : "—"}
        </p>
        <p className="text-xs text-gate-control-light-text-secondary dark:text-gate-control-dark-text-secondary">
          {data
            ? t("gateCheck.status.outside", {
                value: number.format(data.outside),
              })
            : "—"}
        </p>
      </div>
    </GlassCard>
  );
}
