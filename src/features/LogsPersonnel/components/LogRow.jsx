import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import StatusBadge from "../../../shared/components/ui/StatusBadge";
import { useDateFormatters } from "../../../shared/hooks/useDateFormatters";
import { formatPlate } from "../../CheckCredentials/utils/plate";
import { setSearch } from "../../../store/logsSlice";

const CELL =
  "px-6 py-4 text-gate-control-light-text-primary dark:text-gate-control-dark-text-primary";
const MUTED =
  "text-gate-control-light-text-secondary dark:text-gate-control-dark-text-secondary";

export default function LogRow({ log }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const formats = useDateFormatters();

  const when = new Date(log.timestamp);
  const isEntry = log.direction === "entry";

  return (
    <tr className="border-t border-gate-control-light-border-subtle transition-colors hover:bg-gate-control-light-surface-selected/60 dark:border-gate-control-dark-border-subtle dark:hover:bg-gate-control-dark-surface-selected/60">
      <td className={`${CELL} whitespace-nowrap`}>
        {formats.date.format(when)}
      </td>
      <td className={`${CELL} whitespace-nowrap tabular-nums`}>
        {formats.time.format(when)}
      </td>

      <td className="px-6 py-4">
        <button
          type="button"
          onClick={() => dispatch(setSearch(log.fullName))}
          title={t("logsPage.filterByPerson", {
            name: log.fullName,
            interpolation: { escapeValue: false },
          })}
          className="text-left font-semibold text-gate-control-light-text-primary hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-gate-control-light-accent-primary dark:text-gate-control-dark-text-primary dark:focus-visible:ring-gate-control-dark-accent-primary cursor-pointer"
        >
          {log.fullName}
        </button>
      </td>

      <td className="px-6 py-4">
        <p className="text-gate-control-light-text-primary dark:text-gate-control-dark-text-primary">
          {log.rank || "—"}
        </p>
        <p className={`text-xs ${MUTED}`}>{log.unit}</p>
      </td>

      <td className={`${CELL} whitespace-nowrap`}>
        {log.plate ? formatPlate(log.plate) : "—"}
      </td>

      <td className="px-6 py-4">
        <StatusBadge tone={isEntry ? "positive" : "neutral"}>
          {t(`logsPage.direction.${isEntry ? "entry" : "exit"}`)}
        </StatusBadge>
      </td>

      <td className={CELL}>{log.operator || "—"}</td>
    </tr>
  );
}
