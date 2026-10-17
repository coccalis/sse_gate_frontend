import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { LuScanLine, LuShieldX, LuTriangleAlert } from "react-icons/lu";

import ResultMessage from "./ResultMessage";
import ResultValid from "./ResultValid";
import { formatPlate } from "../utils/plate";
import GlassCard from "../../../shared/components/ui/GlassCard";
import StatusBadge from "../../../shared/components/ui/StatusBadge";

const BADGES = {
  waiting: { tone: "neutral", key: "waitingBadge" },
  valid: { tone: "positive", key: "validBadge" },
  denied: { tone: "danger", key: "deniedBadge" },
  error: { tone: "warning", key: "errorBadge" },
};

export default function ResultPanel() {
  const { t } = useTranslation();
  const result = useSelector((state) => state.check.result);
  const status = result?.status ?? "waiting";
  const badge = BADGES[status];

  return (
    // aria-live: screen readers announce each new result
    <GlassCard aria-live="polite" className="space-y-2">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-gate-control-light-text-primary dark:text-gate-control-dark-text-primary">
          {t("gateCheck.result.title")}
        </h2>
        <StatusBadge tone={badge.tone}>
          {t(`gateCheck.result.${badge.key}`)}
        </StatusBadge>
      </div>

      {status === "waiting" && (
        <ResultMessage
          icon={LuScanLine}
          title={t("gateCheck.result.waitingTitle")}
          description={t("gateCheck.result.waitingText")}
        />
      )}

      {status === "valid" && (
        <div className="pt-4">
          <ResultValid result={result} />
        </div>
      )}

      {status === "denied" && <Denied result={result} />}

      {status === "error" && (
        <ResultMessage
          icon={LuTriangleAlert}
          tone="warning"
          title={t("gateCheck.result.errorTitle")}
          description={t("gateCheck.result.errorText")}
        />
      )}
    </GlassCard>
  );
}

function Denied({ result }) {
  const { t } = useTranslation();
  const { reason, method, value } = result;

  // "not_found" has a different message for cards and plates
  const reasonKey = reason === "not_found" ? `not_found_${method}` : reason;
  const scanned =
    method === "plate"
      ? `${t("gateCheck.result.scannedPlate")}: ${formatPlate(value)}`
      : `${t("gateCheck.result.scannedCard")}: ${value}`;

  return (
    <ResultMessage
      icon={LuShieldX}
      backgroundColor="bg-gate-control-light-status-danger-surface dark:bg-gate-control-dark-status-danger-surface rounded-control"
      tone="danger"
      title={t("gateCheck.result.deniedTitle")}
      description={t(`gateCheck.reasons.${reasonKey}`, {
        defaultValue: t("gateCheck.reasons.unknown"),
      })}
      descriptionTip={t("gateCheck.result.not_found_help")}
    >
      <p className="text-xs text-gate-control-light-text-secondary dark:text-gate-control-dark-text-secondary">
        {scanned}
      </p>
    </ResultMessage>
  );
}
