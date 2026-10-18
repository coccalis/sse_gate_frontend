import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { LuTrash2 } from "react-icons/lu";
import Textfield from "../../../shared/components/ui/Textfield";
import Select from "../../../shared/components/ui/Select";
import VehicleTypeSelector from "./VehicleTypeSelector";
import { usePersonnelFormContext } from "../context/PersonnelFormContext";
import { VEHICLE_COLORS } from "../constants";

export default function VehicleFields({ vehicle, index, showHeader }) {
  const { t } = useTranslation();
  const { setVehicleField, removeVehicle, vehicleError } =
    usePersonnelFormContext();
  const { key } = vehicle;

  const colorOptions = useMemo(
    () =>
      VEHICLE_COLORS.map((color) => ({
        value: color,
        label: t(`personnelForm.colors.${color}`),
      })),
    [t],
  );

  const onText = (name) => (e) => setVehicleField(key, name, e.target.value);

  return (
    <div className="space-y-5">
      {showHeader && (
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-sm font-semibold text-gate-control-light-text-primary dark:text-gate-control-dark-text-primary">
            {t("personnelForm.vehicles.vehicleN", { number: index + 1 })}
          </h3>
          <button
            type="button"
            onClick={() => removeVehicle(key)}
            className="inline-flex items-center gap-2 rounded-control px-3 py-1.5 text-xs font-medium text-gate-control-light-status-danger-text transition-colors hover:bg-gate-control-light-status-danger-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-gate-control-light-status-danger-text dark:text-gate-control-dark-status-danger-text dark:hover:bg-gate-control-dark-status-danger-surface dark:focus-visible:ring-gate-control-dark-status-danger-text"
          >
            <LuTrash2 size={14} aria-hidden="true" />
            {t("personnelForm.vehicles.remove")}
          </button>
        </div>
      )}

      <VehicleTypeSelector
        vehicleKey={key}
        value={vehicle.type}
        onChange={(type) => setVehicleField(key, "type", type)}
      />

      <div className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
        <Textfield
          title={t("personnelForm.vehicles.plate.label")}
          type="text"
          name={`plate-${key}`}
          placeholder={t("personnelForm.vehicles.plate.placeholder")}
          autoComplete="off"
          value={vehicle.plate}
          onChange={(e) =>
            setVehicleField(key, "plate", e.target.value.toUpperCase())
          }
          error={vehicleError(key, "plate")}
          className="py-3"
        />
        <Textfield
          title={t("personnelForm.vehicles.make.label")}
          type="text"
          name={`make-${key}`}
          placeholder={t("personnelForm.vehicles.make.placeholder")}
          autoComplete="off"
          value={vehicle.make}
          onChange={onText("make")}
          className="py-3"
        />
        <Textfield
          title={t("personnelForm.vehicles.model.label")}
          type="text"
          name={`model-${key}`}
          placeholder={t("personnelForm.vehicles.model.placeholder")}
          autoComplete="off"
          value={vehicle.model}
          onChange={onText("model")}
          className="py-3"
        />
        <Select
          title={t("personnelForm.vehicles.color.label")}
          name={`color-${key}`}
          placeholder={t("personnelForm.vehicles.color.placeholder")}
          options={colorOptions}
          value={vehicle.color}
          onChange={onText("color")}
        />
      </div>
    </div>
  );
}
