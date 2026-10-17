import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { LuSearch } from "react-icons/lu";
import Textfield from "../../../shared/components/ui/Textfield";
import FilterSelect from "./FilterSelect";
import { useFilterOptions } from "../hooks/usePersonnel";
import {
  setRank,
  setSearch,
  setStatus,
  setUnit,
} from "../../../store/personnelSlice";

const toOptions = (values) => values.map((value) => ({ value, label: value }));

export default function PersonnelFilters() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { search, unit, rank, status } = useSelector(
    (state) => state.personnel,
  );
  const { units, ranks } = useFilterOptions();

  const unitOptions = useMemo(() => toOptions(units), [units]);
  const rankOptions = useMemo(() => toOptions(ranks), [ranks]);
  const statusOptions = useMemo(
    () => [
      { value: "inside", label: t("personnelList.status.inside") },
      { value: "outside", label: t("personnelList.status.outside") },
    ],
    [t],
  );

  return (
    <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-[minmax(0,1fr)_11rem_11rem_11rem]">
      <div className="sm:col-span-3 lg:col-span-1">
        <Textfield
          type="text"
          name="search"
          icon={LuSearch}
          placeholder={t("personnelList.filters.searchPlaceholder")}
          aria-label={t("personnelList.filters.searchLabel")}
          autoComplete="off"
          value={search}
          onChange={(e) => dispatch(setSearch(e.target.value))}
          className="py-3"
        />
      </div>

      <FilterSelect
        label={t("personnelList.filters.unit")}
        allLabel={t("personnelList.filters.allUnits")}
        value={unit}
        onChange={(value) => dispatch(setUnit(value))}
        options={unitOptions}
      />
      <FilterSelect
        label={t("personnelList.filters.rank")}
        allLabel={t("personnelList.filters.allRanks")}
        value={rank}
        onChange={(value) => dispatch(setRank(value))}
        options={rankOptions}
      />
      <FilterSelect
        label={t("personnelList.filters.status")}
        allLabel={t("personnelList.filters.allStatuses")}
        value={status}
        onChange={(value) => dispatch(setStatus(value))}
        options={statusOptions}
      />
    </div>
  );
}
