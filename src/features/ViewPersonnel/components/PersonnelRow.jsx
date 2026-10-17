import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LuPencil, LuTrash2 } from "react-icons/lu";
import Avatar from "../../../shared/components/ui/Avatar";
import StatusBadge from "../../../shared/components/ui/StatusBadge";
import { formatPlate } from "../../CheckCredentials/utils/plate";

const ACTION_BASE =
  "inline-flex h-9 w-9 items-center justify-center rounded-control transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gate-control-light-accent-primary dark:focus-visible:ring-gate-control-dark-accent-primary";

export default function PersonnelRow({ person, onDelete }) {
  const { t } = useTranslation();
  const { id, fullName, cardId, photoUrl, rank, unit, vehicles, status } =
    person;

  const mainPlate = vehicles[0]?.plate;
  const extraVehicles = vehicles.length - 1;
  const isInside = status === "inside";
  const labelOptions = {
    name: fullName,
    interpolation: { escapeValue: false },
  };

  return (
    <tr className="border-t border-gate-control-light-border-subtle transition-colors hover:bg-gate-control-light-surface-selected/60 dark:border-gate-control-dark-border-subtle dark:hover:bg-gate-control-dark-surface-selected/60">
      <td className="px-6 py-4">
        <div className="flex items-center gap-4">
          <Avatar photoUrl={photoUrl} name={fullName} />
          <div className="min-w-0">
            <p className="truncate font-semibold text-gate-control-light-text-primary dark:text-gate-control-dark-text-primary">
              {fullName}
            </p>
            <p className="text-xs text-gate-control-light-text-secondary dark:text-gate-control-dark-text-secondary">
              {cardId}
            </p>
          </div>
        </div>
      </td>

      <td className="px-6 py-4 text-gate-control-light-text-primary dark:text-gate-control-dark-text-primary">
        {rank || "—"}
      </td>
      <td className="px-6 py-4 text-gate-control-light-text-primary dark:text-gate-control-dark-text-primary">
        {unit || "—"}
      </td>

      <td className="whitespace-nowrap px-6 py-4 text-gate-control-light-text-primary dark:text-gate-control-dark-text-primary">
        {mainPlate ? formatPlate(mainPlate) : "—"}
        {extraVehicles > 0 && (
          <span className="ml-2 text-xs text-gate-control-light-text-secondary dark:text-gate-control-dark-text-secondary">
            +{extraVehicles}
          </span>
        )}
      </td>

      <td className="px-6 py-4">
        <StatusBadge tone={isInside ? "positive" : "neutral"}>
          {t(`personnelList.status.${isInside ? "inside" : "outside"}`)}
        </StatusBadge>
      </td>

      <td className="px-6 py-4">
        <div className="flex items-center gap-1">
          <Link
            to={`/personnel/${id}/edit`}
            aria-label={t("personnelList.actions.edit", labelOptions)}
            title={t("personnelList.actions.edit", labelOptions)}
            className={`${ACTION_BASE} text-gate-control-light-text-secondary hover:bg-gate-control-light-surface-selected hover:text-gate-control-light-text-primary dark:text-gate-control-dark-text-secondary dark:hover:bg-gate-control-dark-surface-selected dark:hover:text-gate-control-dark-text-primary`}
          >
            <LuPencil size={18} aria-hidden="true" />
          </Link>

          <button
            type="button"
            onClick={() => onDelete(person)}
            aria-label={t("personnelList.actions.delete", labelOptions)}
            title={t("personnelList.actions.delete", labelOptions)}
            className={`${ACTION_BASE} text-gate-control-light-status-danger-text hover:bg-gate-control-light-status-danger-surface dark:text-gate-control-dark-status-danger-text dark:hover:bg-gate-control-dark-status-danger-surface`}
          >
            <LuTrash2 size={18} aria-hidden="true" />
          </button>
        </div>
      </td>
    </tr>
  );
}
