import { useTranslation } from "react-i18next";
import { LuPlugZap, LuUnplug } from "react-icons/lu";
import { useReaderState } from "../hooks/useGate";

const TEXT_TONES = {
  checking:
    "text-gate-control-light-text-secondary dark:text-gate-control-dark-text-secondary",
  connected:
    "text-gate-control-light-status-positive-text dark:text-gate-control-dark-status-positive-text",
  disconnected:
    "text-gate-control-light-status-warning-text dark:text-gate-control-dark-status-warning-text",
};

export default function ReaderHint() {
  const { t } = useTranslation();
  const state = useReaderState();

  const Icon = state === "disconnected" ? LuUnplug : LuPlugZap;
  const text =
    state === "connected"
      ? `${t("gateCheck.reader.connected")} · ${t("gateCheck.reader.ready")}`
      : t(`gateCheck.reader.${state}`);

  return (
    <p
      className={`flex items-center gap-2 text-xs ${TEXT_TONES[state]}`}
      role="status"
    >
      <Icon size={14} aria-hidden="true" />
      {text}
    </p>
  );
}
