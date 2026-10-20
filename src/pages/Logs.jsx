import { useTranslation } from "react-i18next";
import LogsFilters from "../features/LogsPersonnel/components/LogsFilters";
import PersonProfileCard from "../features/LogsPersonnel/components/PersonProfileCard";
import HistoryHeader from "../features/LogsPersonnel/components/HistoryHeader";
import LogsTable from "../features/LogsPersonnel/components/LogsTable";

function Logs() {
  const { t } = useTranslation();

  return (
    <div className="mx-auto w-full max-w-8xl space-y-6">
      <header>
        <h1 className="text-3xl font-semibold text-gate-control-light-text-primary dark:text-gate-control-dark-text-primary">
          {t("logsPage.title")}
        </h1>
        <p className="mt-1 text-sm text-gate-control-light-text-secondary dark:text-gate-control-dark-text-secondary">
          {t("logsPage.subtitle")}
        </p>
      </header>

      <LogsFilters />
      <PersonProfileCard />

      <section className="space-y-4">
        <HistoryHeader />
        <LogsTable />
      </section>
    </div>
  );
}

export default Logs;
