import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { LuCar, LuSearch } from "react-icons/lu";
import Textfield from "../../../shared/components/ui/Textfield";
import Select from "../../../shared/components/ui/Select";
import DateRangePicker from "../../../shared/components/ui/DateRangePicker";
import {
  setDateRange,
  setDirection,
  setPlate,
  setSearch,
} from "../../../store/logsSlice";

export default function LogsFilters() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { search, plate, dateFrom, dateTo, direction } = useSelector(
    (state) => state.logs,
  );

  const directionOptions = useMemo(
    () => [
      { value: "entry", label: t("logsPage.direction.entry") },
      { value: "exit", label: t("logsPage.direction.exit") },
    ],
    [t],
  );

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,1fr)]">
      <Textfield
        title={t("logsPage.filters.name")}
        type="text"
        name="search"
        icon={LuSearch}
        placeholder={t("logsPage.filters.namePlaceholder")}
        autoComplete="off"
        value={search}
        onChange={(e) => dispatch(setSearch(e.target.value))}
        className="py-3"
      />

      <Textfield
        title={t("logsPage.filters.plate")}
        type="text"
        name="plate"
        icon={LuCar}
        placeholder={t("logsPage.filters.platePlaceholder")}
        autoComplete="off"
        value={plate}
        onChange={(e) => dispatch(setPlate(e.target.value.toUpperCase()))}
        className="py-3"
      />

      <DateRangePicker
        title={t("logsPage.filters.date")}
        placeholder={t("logsPage.filters.allDates")}
        value={{ from: dateFrom, to: dateTo }}
        onChange={(range) => dispatch(setDateRange(range))}
      />

      <Select
        title={t("logsPage.filters.direction")}
        name="direction"
        muteEmpty={false}
        placeholder={t("logsPage.filters.allDirections")}
        options={directionOptions}
        value={direction}
        onChange={(e) => dispatch(setDirection(e.target.value))}
      />
    </div>
  );
}
