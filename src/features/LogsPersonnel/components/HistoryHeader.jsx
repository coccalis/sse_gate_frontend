import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useLogs } from "../hooks/useLogs";
import { useHasFilters } from "../hooks/useHasFilters";
import { useSearchedPerson } from "../hooks/useSearchedPerson";
import { resetFilters } from "../../../store/logsSlice";
import Button from "../../../shared/components/ui/Button";

export default function HistoryHeader() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { data } = useLogs();
  const person = useSearchedPerson();
  const hasFilters = useHasFilters();

  const summary = data
    ? person
      ? t("logsPage.history.summaryPerson", {
          count: data.total,
          name: person.fullName,
          interpolation: { escapeValue: false },
        })
      : t("logsPage.history.summary", { count: data.total })
    : null;

  return (
    <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
      <h2 className="text-base font-semibold text-gate-control-light-text-primary dark:text-gate-control-dark-text-primary">
        {t("logsPage.history.title")}
      </h2>

      <div className="flex flex-wrap items-center gap-3">
        {summary && (
          <p className="text-xs text-gate-control-light-text-secondary dark:text-gate-control-dark-text-secondary">
            {summary}
          </p>
        )}
        {hasFilters && (
          <Button
            type="button"
            onClick={() => dispatch(resetFilters())}
            className="text-xs font-medium text-gate-control-light-text-primary hover:text-gate-control-light-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-gate-control-light-accent-primary dark:text-gate-control-dark-text-primary dark:hover:text-gate-control-dark-text-primary dark:focus-visible:ring-gate-control-dark-accent-primary"
          >
            {t("logsPage.filters.clear")}
          </Button>
        )}
      </div>
    </div>
  );
}
