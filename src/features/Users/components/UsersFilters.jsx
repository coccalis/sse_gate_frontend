import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { LuSearch } from "react-icons/lu";
import Textfield from "../../../shared/components/ui/Textfield";
import FilterSelect from "../../ViewPersonnel/components/FilterSelect";
import { setRole, setSearch, setStatus } from "../../../store/usersSlice";

export default function UsersFilters() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { search, role, status } = useSelector((state) => state.users);

  const roleOptions = useMemo(
    () => [
      { value: "admin", label: t("usersPage.roles.admin") },
      { value: "operator", label: t("usersPage.roles.operator") },
    ],
    [t],
  );
  const statusOptions = useMemo(
    () => [
      { value: "active", label: t("usersPage.statuses.active") },
      { value: "inactive", label: t("usersPage.statuses.inactive") },
    ],
    [t],
  );

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_12rem_12rem]">
      <div className="sm:col-span-2 lg:col-span-1">
        <Textfield
          type="text"
          name="search"
          icon={LuSearch}
          placeholder={t("usersPage.filters.searchPlaceholder")}
          aria-label={t("usersPage.filters.searchLabel")}
          autoComplete="off"
          value={search}
          onChange={(e) => dispatch(setSearch(e.target.value))}
          className="py-3"
        />
      </div>

      <FilterSelect
        label={t("usersPage.filters.role")}
        allLabel={t("usersPage.filters.allRoles")}
        value={role}
        onChange={(value) => dispatch(setRole(value))}
        options={roleOptions}
      />
      <FilterSelect
        label={t("usersPage.filters.status")}
        allLabel={t("usersPage.filters.allStatuses")}
        value={status}
        onChange={(value) => dispatch(setStatus(value))}
        options={statusOptions}
      />
    </div>
  );
}
