import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useCreatePersonnel } from "../features/AddPersonnel/hooks/useCreatePersonnel";
import PersonnelForm from "./PersonnelForm";

const LIST_PATH = "/view-personnel";
function AddPersonnel() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useCreatePersonnel();

  // If this throws, the form shows the error (and maps 409 to the right field)
  const handleSubmit = async (payload) => {
    await mutateAsync(payload);
    navigate(LIST_PATH);
  };

  return (
    <div className="mx-auto w-full max-w-8xl space-y-6">
      <header>
        <h1 className="text-3xl font-semibold text-gate-control-light-text-primary dark:text-gate-control-dark-text-primary">
          {t("personnelForm.addTitle")}
        </h1>
        <p className="mt-1 text-sm text-gate-control-light-text-secondary dark:text-gate-control-dark-text-secondary">
          {t("personnelForm.addSubtitle")}
        </p>
      </header>

      <PersonnelForm
        onSubmit={handleSubmit}
        onCancel={() => navigate(LIST_PATH)}
        isSubmitting={isPending}
      />
    </div>
  );
}

export default AddPersonnel;
