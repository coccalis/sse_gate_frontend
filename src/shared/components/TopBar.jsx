import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { IoMdMenu } from "react-icons/io";
import { LuSlash } from "react-icons/lu";
import { openSidebar } from "../../store/uiSlice";
import { nav_items } from "../data/nav-items";
import { TopBarFullDate, TopBarShortDate } from "../utils/dates";

function TopBar() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  const locale = t("locale");
  const fullDate = TopBarFullDate(locale, now);
  const shortDate = TopBarShortDate(locale, now);

  const pageKey = nav_items.find((item) => item.path === pathname)?.id;
  const crumbs = pageKey ? [t("gate"), t(pageKey)] : [t("gate")];

  return (
    <header className="flex h-16 shrink-0 items-center gap-3 border-b border-gate-control-light-border-subtle bg-transparent px-4 backdrop-blur-xl dark:border-gate-control-dark-border-subtle dark:bg-transparent sm:px-6">
      <button
        type="button"
        onClick={() => dispatch(openSidebar())}
        aria-label={t("openMenu")}
        className="rounded-control p-2 text-gate-control-light-text-primary hover:bg-gate-control-light-surface-selected focus:outline-none focus-visible:ring-2 focus-visible:ring-gate-control-light-accent-primary dark:text-gate-control-dark-text-primary dark:hover:bg-gate-control-dark-surface-selected dark:focus-visible:ring-gate-control-dark-accent-primary lg:hidden"
      >
        <IoMdMenu className="h-6 w-6" />
      </button>

      <nav aria-label="Breadcrumb" className="min-w-0 flex-1">
        <ol className="flex items-center gap-1.5 text-sm">
          {crumbs.map((crumb, i) => {
            const last = i === crumbs.length - 1;
            return (
              <li
                key={crumb}
                className={`flex items-center gap-1.5 ${
                  last ? "min-w-0" : "hidden sm:flex"
                }`}
              >
                <span
                  aria-current={last ? "page" : undefined}
                  className={`truncate ${
                    last
                      ? "font-semibold text-gate-control-light-text-primary dark:text-gate-control-dark-text-primary"
                      : "text-gate-control-light-text-secondary dark:text-gate-control-dark-text-secondary"
                  }`}
                >
                  {crumb}
                </span>
                {!last && (
                  <LuSlash className="h-4 w-4 shrink-0 text-gate-control-light-text-secondary dark:text-gate-control-dark-text-secondary" />
                )}
              </li>
            );
          })}
        </ol>
      </nav>

      <time
        dateTime={now.toISOString()}
        className="shrink-0 text-sm font-medium capitalize text-gate-control-light-text-secondary dark:text-gate-control-dark-text-secondary"
      >
        <span className="hidden md:inline">{fullDate}</span>
        <span className="md:hidden">{shortDate}</span>
      </time>
    </header>
  );
}

export default TopBar;
