import { useTranslation } from "react-i18next";
import { LuPlus } from "react-icons/lu";
import Button from "../../../shared/components/ui/Button";
import FormSection from "./FormSection";
import VehicleFields from "./VehicleFields";
import { usePersonnelFormContext } from "../context/PersonnelFormContext";

export default function VehiclesSection() {
  const { t } = useTranslation();
  const { values, addVehicle, mode } = usePersonnelFormContext();
  const { vehicles } = values;

  // Titled, framed blocks with a remove button when there are several vehicles,
  // and always when editing (so the only vehicle can be removed too)
  const showHeader = vehicles.length > 1 || mode === "edit";

  return (
    <FormSection
      title={t("personnelForm.vehicles.title")}
      description={t("personnelForm.vehicles.description")}
    >
      {vehicles.length === 0 && (
        <p className="text-sm text-gate-control-light-text-secondary dark:text-gate-control-dark-text-secondary">
          {t("personnelForm.vehicles.empty")}
        </p>
      )}

      <div className="space-y-6">
        {vehicles.map((vehicle, index) => (
          <div
            key={vehicle.key}
            className={
              showHeader
                ? "rounded-control border border-gate-control-light-border-subtle p-5 dark:border-gate-control-dark-border-subtle"
                : undefined
            }
          >
            <VehicleFields
              vehicle={vehicle}
              index={index}
              showHeader={showHeader}
            />
          </div>
        ))}
      </div>

      <Button type="button" variant="secondary" onClick={addVehicle}>
        <LuPlus size={18} aria-hidden="true" />
        {vehicles.length === 0
          ? t("personnelForm.vehicles.addFirst")
          : t("personnelForm.vehicles.add")}
      </Button>
    </FormSection>
  );
}
