import { useTranslation } from "react-i18next";
import { usePersonnelForm } from "../features/PersonnelForm/hooks/usePersonnelForm";
import { PersonnelFormContext } from "../features/PersonnelForm/context/PersonnelFormContext";
import GlassCard from "../shared/components/ui/GlassCard";
import BasicInfoSection from "../features/PersonnelForm/components/BasicInfoSection";
import Button from "../shared/components/ui/Button";
import { LuCheck } from "react-icons/lu";
import VehiclesSection from "../features/PersonnelForm/components/VehiclesSection";

export default function PersonnelForm({
  mode = "add",
  initialValues,
  initialPhotoUrl,
  submitLabel,
  onSubmit,
  onCancel,
  isSubmitting = false,
}) {
  const { t } = useTranslation();
  const form = usePersonnelForm({
    initialValues,
    initialPhotoUrl,
    onSubmit,
    isSubmitting,
  });

  return (
    <PersonnelFormContext.Provider value={{ ...form, mode }}>
      <form
        ref={form.formRef}
        onSubmit={form.submit}
        noValidate
        className="space-y-6"
      >
        <GlassCard padded={false} className="space-y-8 p-6 sm:p-8">
          <BasicInfoSection />
          <hr className="border-gate-control-light-border-subtle dark:border-gate-control-dark-border-subtle" />
          <VehiclesSection />
        </GlassCard>

        {form.submitError && (
          <p
            role="alert"
            className="rounded-control bg-gate-control-light-status-danger-surface px-4 py-3 text-sm text-gate-control-light-status-danger-text dark:bg-gate-control-dark-status-danger-surface dark:text-gate-control-dark-status-danger-text"
          >
            {t(`personnelForm.errors.${form.submitError}`)}
          </p>
        )}

        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            {t("personnelForm.actions.cancel")}
          </Button>
          <Button type="submit" loading={isSubmitting}>
            <LuCheck size={18} aria-hidden="true" />
            {submitLabel ?? t("personnelForm.actions.submit")}
          </Button>
        </div>
      </form>
    </PersonnelFormContext.Provider>
  );
}
