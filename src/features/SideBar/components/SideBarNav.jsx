import { useDispatch, useSelector } from "react-redux";

import { nav_items } from "../../../shared/data/nav-items";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { closeSidebar } from "../../../store/uiSlice";

export default function SidebarNav() {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <nav className="flex-1 overflow-y-auto px-3" aria-label={t("section")}>
      <p className="px-3 pb-2 text-xs font-medium uppercase tracking-wide text-gate-control-light-text-secondary dark:text-gate-control-dark-text-secondary">
        {t("section")}
      </p>

      <ul className="space-y-1">
        {nav_items.map(({ id, icon: Icon, path, end }) => {
          return (
            <li key={id}>
              <NavLink
                to={path}
                end={end}
                onClick={() => dispatch(closeSidebar())}
                className={({ isActive }) =>
                  `flex w-full items-center gap-3 rounded-control px-3 py-3 text-left text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gate-control-light-accent-primary dark:focus-visible:ring-gate-control-dark-accent-primary ${
                    isActive
                      ? "bg-gate-control-light-surface-selected font-semibold text-gate-control-light-text-primary dark:bg-gate-control-dark-surface-selected dark:text-gate-control-dark-text-primary"
                      : "text-gate-control-light-text-secondary hover:bg-gate-control-light-surface-selected/60 dark:text-gate-control-dark-text-secondary dark:hover:bg-gate-control-dark-surface-selected/60"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      className={`h-5 w-5 shrink-0 ${
                        isActive
                          ? "text-gate-control-light-accent-primary dark:text-gate-control-dark-accent-primary"
                          : ""
                      }`}
                      strokeWidth={1.75}
                    />
                    <span className="flex-1 truncate">{t(id)}</span>
                    {isActive && (
                      <span className="h-2 w-2 rounded-full bg-gate-control-light-accent-primary dark:bg-gate-control-dark-accent-primary" />
                    )}
                  </>
                )}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
