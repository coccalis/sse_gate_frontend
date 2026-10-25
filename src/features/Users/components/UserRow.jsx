import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LuPencil, LuTrash2 } from "react-icons/lu";
import Avatar from "../../../shared/components/ui/Avatar";
import StatusBadge from "../../../shared/components/ui/StatusBadge";
import { useLastLoginLabel } from "../hooks/useLastLoginLabel";

const ACTION_BASE =
  "inline-flex h-9 w-9 items-center justify-center rounded-control transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gate-control-light-accent-primary dark:focus-visible:ring-gate-control-dark-accent-primary";
const CELL =
  "px-6 py-4 text-gate-control-light-text-primary dark:text-gate-control-dark-text-primary";

export default function UserRow({ user, isSelf, onDelete }) {
  const { t } = useTranslation();
  const lastLoginLabel = useLastLoginLabel();

  const { id, name, email, role, status, lastLoginAt } = user;
  const labelOptions = { name, interpolation: { escapeValue: false } };

  return (
    <tr className="border-t border-gate-control-light-border-subtle transition-colors hover:bg-gate-control-light-surface-selected/60 dark:border-gate-control-dark-border-subtle dark:hover:bg-gate-control-dark-surface-selected/60">
      <td className="px-6 py-4">
        <div className="flex items-center gap-4">
          <Avatar name={name} />
          <div className="min-w-0">
            <p className="truncate font-semibold text-gate-control-light-text-primary dark:text-gate-control-dark-text-primary">
              {name}
            </p>
            {isSelf && (
              <p className="text-xs text-gate-control-light-text-secondary dark:text-gate-control-dark-text-secondary">
                {t("usersPage.you")}
              </p>
            )}
          </div>
        </div>
      </td>

      <td className={CELL}>{email}</td>

      <td className="px-6 py-4">
        <StatusBadge tone={role === "admin" ? "positive" : "neutral"}>
          {t(`usersPage.roles.${role}`, { defaultValue: role })}
        </StatusBadge>
      </td>

      <td className={`${CELL} whitespace-nowrap`}>
        {lastLoginLabel(lastLoginAt)}
      </td>

      <td className="px-6 py-4">
        <StatusBadge tone={status === "active" ? "positive" : "neutral"}>
          {t(`usersPage.statuses.${status}`, { defaultValue: status })}
        </StatusBadge>
      </td>

      <td className="px-6 py-4">
        <div className="flex items-center gap-1">
          <Link
            to={`/admin/users/${id}/edit`}
            aria-label={t("usersPage.actions.edit", labelOptions)}
            title={t("usersPage.actions.edit", labelOptions)}
            className={`${ACTION_BASE} text-gate-control-light-text-secondary hover:bg-gate-control-light-surface-selected hover:text-gate-control-light-text-primary dark:text-gate-control-dark-text-secondary dark:hover:bg-gate-control-dark-surface-selected dark:hover:text-gate-control-dark-text-primary`}
          >
            <LuPencil size={18} aria-hidden="true" />
          </Link>

          {/* You cannot delete yourself (the server refuses it as well) */}
          <button
            type="button"
            onClick={() => onDelete(user)}
            disabled={isSelf}
            aria-label={t("usersPage.actions.delete", labelOptions)}
            title={
              isSelf
                ? t("usersPage.actions.cannotDeleteSelf")
                : t("usersPage.actions.delete", labelOptions)
            }
            className={`${ACTION_BASE} text-gate-control-light-status-danger-text hover:bg-gate-control-light-status-danger-surface disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent dark:text-gate-control-dark-status-danger-text dark:hover:bg-gate-control-dark-status-danger-surface dark:disabled:hover:bg-transparent`}
          >
            <LuTrash2 size={18} aria-hidden="true" />
          </button>
        </div>
      </td>
    </tr>
  );
}
