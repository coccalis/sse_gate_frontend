import { useTranslation } from "react-i18next";
import { LuCircleCheck } from "react-icons/lu";
import { VEHICLE_TYPES } from "../constants";


export default function VehicleTypeSelector({ vehicleKey, value, onChange }) {
  const { t } = useTranslation();
  const name = `vehicle-type-${vehicleKey}`;

  return (
    <fieldset>
      <legend className="sr-only">{t("personnelForm.vehicles.type.label")}</legend>

      <div className="grid gap-4 sm:grid-cols-2">
        {VEHICLE_TYPES.map(({ value: type, icon: Icon }) => {
          const selected = value === type;
          return (
            <label key={type} className="block cursor-pointer">
              <input
                type="radio"
                name={name}
                value={type}
                checked={selected}
                onChange={() => onChange(type)}
                className="peer sr-only"
              />
              <span
                className={`flex h-20 items-center gap-4 rounded-control border px-6 text-sm font-semibold text-gate-control-light-text-primary transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-gate-control-light-accent-primary dark:text-gate-control-dark-text-primary dark:peer-focus-visible:ring-gate-control-dark-accent-primary ${
                  selected
                    ? "border-gate-control-light-accent-primary bg-gate-control-light-surface-selected dark:border-gate-control-dark-accent-primary dark:bg-gate-control-dark-surface-selected"
                    : "border-gate-control-light-border-subtle bg-gate-control-light-surface-input hover:bg-gate-control-light-surface-selected/60 dark:border-gate-control-dark-border-subtle dark:bg-gate-control-dark-surface-input dark:hover:bg-gate-control-dark-surface-selected/60"
                }`}
              >
                <Icon size={26} aria-hidden="true" />
                {t(`personnelForm.vehicles.type.${type}`)}
                {selected && (
                  <LuCircleCheck
                    size={20}
                    aria-hidden="true"
                    className="text-gate-control-light-status-positive-text dark:text-gate-control-dark-status-positive-text"
                  />
                )}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
