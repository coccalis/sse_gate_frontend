import { useTranslation } from "react-i18next";
import UsersSummary from "../features/Users/components/UsersSummary";
import UsersFilters from "../features/Users/components/UsersFilters";
import UsersTable from "../features/Users/components/UsersTable";
import RolesNote from "../features/Users/components/RolesNote";

export default function UsersPage() {
  const { t } = useTranslation();

  return (
    <div className="mx-auto w-full max-w-8xl space-y-6">
      <header>
        <h1 className="text-3xl font-semibold text-gate-control-light-text-primary dark:text-gate-control-dark-text-primary">
          {t("usersPage.title")}
        </h1>
        <p className="mt-1 text-sm text-gate-control-light-text-secondary dark:text-gate-control-dark-text-secondary">
          {t("usersPage.subtitle")}
        </p>
      </header>

      <UsersSummary />
      <UsersFilters />
      <UsersTable />
      <RolesNote />
    </div>
  );
}
