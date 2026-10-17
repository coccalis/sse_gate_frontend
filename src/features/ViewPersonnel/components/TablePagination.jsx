import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { getPageItems } from "../utils/pagination";

const BUTTON_BASE =
  "inline-flex h-8 min-w-8 items-center justify-center rounded-full px-2 text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gate-control-light-accent-primary disabled:cursor-not-allowed disabled:opacity-40 dark:focus-visible:ring-gate-control-dark-accent-primary";
const MUTED =
  "text-gate-control-light-text-secondary hover:bg-gate-control-light-surface-selected dark:text-gate-control-dark-text-secondary dark:hover:bg-gate-control-dark-surface-selected";
const CURRENT =
  "bg-gate-control-light-surface-selected font-semibold text-gate-control-light-text-primary dark:bg-gate-control-dark-surface-selected dark:text-gate-control-dark-text-primary";

export default function TablePagination({
  page,
  totalPages,
  total,
  pageSize,
  onPageChange,
}) {
  const { t } = useTranslation();
  const items = useMemo(() => getPageItems(page, totalPages), [page, totalPages]);

  const number = new Intl.NumberFormat(t("locale"));
  const from = (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);

  return (
    <div className="flex flex-col items-center justify-between gap-3 border-t border-gate-control-light-border-subtle px-6 py-4 dark:border-gate-control-dark-border-subtle sm:flex-row">
      <p className="text-xs text-gate-control-light-text-secondary dark:text-gate-control-dark-text-secondary">
        {t("personnelList.pagination.showing", {
          from: number.format(from),
          to: number.format(to),
          total: number.format(total),
        })}
      </p>

      {totalPages > 1 && (
        <nav
          aria-label={t("personnelList.pagination.label")}
          className="flex items-center gap-1"
        >
          <button
            type="button"
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
            aria-label={t("personnelList.pagination.previous")}
            className={`${BUTTON_BASE} ${MUTED}`}
          >
            <LuChevronLeft size={16} aria-hidden="true" />
          </button>

          {items.map((item, index) =>
            item === "ellipsis" ? (
              <span
                key={`ellipsis-${index}`}
                aria-hidden="true"
                className="px-1 text-sm text-gate-control-light-text-secondary dark:text-gate-control-dark-text-secondary"
              >
                …
              </span>
            ) : (
              <button
                key={item}
                type="button"
                onClick={() => onPageChange(item)}
                aria-label={t("personnelList.pagination.page", { page: item })}
                aria-current={item === page ? "page" : undefined}
                className={`${BUTTON_BASE} ${item === page ? CURRENT : MUTED}`}
              >
                {item}
              </button>
            )
          )}

          <button
            type="button"
            onClick={() => onPageChange(page + 1)}
            disabled={page === totalPages}
            aria-label={t("personnelList.pagination.next")}
            className={`${BUTTON_BASE} ${MUTED}`}
          >
            <LuChevronRight size={16} aria-hidden="true" />
          </button>
        </nav>
      )}
    </div>
  );
}
