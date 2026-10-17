import { useTranslation } from "react-i18next";
import PersonnelSummary from "../features/ViewPersonnel/components/PersonnelSummary";
import PersonnelFilters from "../features/ViewPersonnel/components/PersonnelFilters";
import PersonnelTable from "../features/ViewPersonnel/components/PersonnelTable";

function ViewPersonnel() {
  const { t } = useTranslation();
  return (
    <div className="mx-auto w-full max-w-8xl space-y-6">
      <header>
        <h1 className="text-3xl font-semibold text-gate-control-light-text-primary dark:text-gate-control-dark-text-primary">
          {t("personnelList.title")}
        </h1>
        <p className="mt-1 text-sm text-gate-control-light-text-secondary dark:text-gate-control-dark-text-secondary">
          {t("personnelList.subtitle")}
        </p>
      </header>

      <PersonnelSummary />
      <PersonnelFilters />
      <PersonnelTable />
    </div>
  );
}

export default ViewPersonnel;
