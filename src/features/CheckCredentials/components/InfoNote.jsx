import { useTranslation } from "react-i18next";
import { LuInfo } from "react-icons/lu";

export default function InfoNote() {
  const { t } = useTranslation();

  return (
    <div className="flex gap-3 rounded-control bg-gate-control-light-surface-warning p-5 text-sm text-gate-control-light-status-warning-text dark:bg-gate-control-dark-surface-warning dark:text-gate-control-dark-status-warning-text">
      <LuInfo size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
      <p>{t("gateCheck.note")}</p>
    </div>
  );
}
