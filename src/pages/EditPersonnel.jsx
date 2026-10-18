import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { usePerson } from "../features/EditPersonnel/hooks/usePerson";
import { useUpdatePersonnel } from "../features/EditPersonnel/hooks/useUpdatePersonnel";
import { useMemo } from "react";
import EditPersonnelSkeleton from "../features/EditPersonnel/components/EditPersonnelSkeleton";
import Button from "../shared/components/ui/Button";
import GlassCard from "../shared/components/ui/GlassCard";
import StateMessage from "../shared/components/ui/StateMessage";
import { toFormValues } from "../features/PersonnelForm/utils/toFormValues";
import PersonnelForm from "./PersonnelForm";

const LIST_PATH = "/view-personnel";

function EditPersonnel() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: person, isPending, isError, error, refetch } = usePerson(id);
  const { mutateAsync, isPending: isSaving } = useUpdatePersonnel(id);

  const initialValues = useMemo(
    () => (person ? toFormValues(person) : undefined),
    [person],
  );

  const goBack = () => navigate(LIST_PATH);

  // If this throws, the form shows the error (and maps 409 to the right field)
  const handleSubmit = async (payload) => {
    await mutateAsync(payload);
    goBack();
  };

  if (isPending) return <EditPersonnelSkeleton />;

  if (isError) {
    const notFound = error?.status === 404;
    return (
      <div className="mx-auto w-full max-w-5xl">
        <GlassCard padded={false}>
          <StateMessage
            icon={notFound ? LuUserX : LuTriangleAlert}
            tone={notFound ? "neutral" : "warning"}
            title={t(
              notFound
                ? "personnelEdit.notFoundTitle"
                : "personnelEdit.errorTitle",
            )}
            description={t(
              notFound
                ? "personnelEdit.notFoundText"
                : "personnelEdit.errorText",
            )}
          >
            <div className="flex flex-wrap justify-center gap-3">
              {!notFound && (
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => refetch()}
                >
                  {t("personnelEdit.retry")}
                </Button>
              )}
              <Button type="button" onClick={goBack}>
                {t("personnelEdit.back")}
              </Button>
            </div>
          </StateMessage>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-8xl space-y-6">
      <header>
        <h1 className="text-3xl font-semibold text-gate-control-light-text-primary dark:text-gate-control-dark-text-primary">
          {t("personnelEdit.title")}
        </h1>
        <p className="mt-1 text-sm text-gate-control-light-text-secondary dark:text-gate-control-dark-text-secondary">
          {t("personnelEdit.subtitle", {
            name: person.fullName,
            interpolation: { escapeValue: false },
          })}
        </p>
      </header>

      {/* key: opening another person always starts a fresh form */}
      <PersonnelForm
        key={person.id}
        mode="edit"
        initialValues={initialValues}
        initialPhotoUrl={person.photoUrl}
        submitLabel={t("personnelEdit.save")}
        onSubmit={handleSubmit}
        onCancel={goBack}
        isSubmitting={isSaving}
      />
    </div>
  );
}

export default EditPersonnel;
