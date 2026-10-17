// Static for now. Later: read the logged-in user from your auth
import { IoLogOutOutline } from "react-icons/io5";

import { useTranslation } from "react-i18next";

// query/slice and call the logout mutation in onClick.
export default function SidebarUser() {
  const { t } = useTranslation();

  return (
    <div className="border-t border-gate-control-light-border-subtle px-6 py-4 dark:border-gate-control-dark-border-subtle">
      <p className="text-sm font-bold text-gate-control-light-text-primary dark:text-gate-control-dark-text-primary">
        {t("role")}
      </p>
      <p className="text-xs text-gate-control-light-text-secondary dark:text-gate-control-dark-text-secondary">
        {t("user")}
      </p>

      <button
        type="button"
        className="mt-4 flex items-center gap-3 rounded-lg py-1 text-sm text-gate-control-light-text-secondary transition-colors hover:text-gate-control-light-status-danger-text focus:outline-none focus-visible:ring-2 focus-visible:ring-gate-control-light-accent-primary dark:text-gate-control-dark-text-secondary dark:hover:text-gate-control-dark-status-danger-text dark:focus-visible:ring-gate-control-dark-accent-primary"
      >
        <IoLogOutOutline className="h-5 w-5" strokeWidth={1.75} />
        {t("logout")}
      </button>
    </div>
  );
}
