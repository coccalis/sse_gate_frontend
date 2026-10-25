import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LuTriangleAlert, LuUserX } from "react-icons/lu";
import Button from "../shared/components/ui/Button";
import GlassCard from "../shared/components/ui/GlassCard";
import StateMessage from "../shared/components/ui/StateMessage";
import { useCurrentUser } from "../shared/auth/useCurrentUser";
import UserForm from "../features/Users/components/UserForm";
import UserFormSkeleton from "../features/Users/components/UserFormSkeleton";
import { useUser } from "../features/Users/hooks/useUser";
import { useUpdateUser } from "../features/Users/hooks/useUserMutations";

const LIST_PATH = "/admin/users";

export default function EditUserPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: me } = useCurrentUser();
  const { data: user, isPending, isError, error, refetch } = useUser(id);
  const { mutateAsync, isPending: isSaving } = useUpdateUser(id);

  const initialValues = useMemo(
    () =>
      user
        ? {
            name: user.name,
            email: user.email,
            role: user.role,
            status: user.status,
            password: "",
          }
        : undefined,
    [user],
  );

  const goBack = () => navigate(LIST_PATH);

  const handleSubmit = async (payload) => {
    await mutateAsync(payload);
    goBack();
  };

  if (isPending) return <UserFormSkeleton />;

  if (isError) {
    const notFound = error?.status === 404;
    return (
      <div className="mx-auto w-full max-w-4xl">
        <GlassCard padded={false}>
          <StateMessage
            icon={notFound ? LuUserX : LuTriangleAlert}
            tone={notFound ? "neutral" : "warning"}
            title={t(
              notFound
                ? "usersPage.form.edit.notFoundTitle"
                : "usersPage.form.edit.errorTitle",
            )}
            description={t(
              notFound
                ? "usersPage.form.edit.notFoundText"
                : "usersPage.form.edit.errorText",
            )}
          >
            <div className="flex flex-wrap justify-center gap-3">
              {!notFound && (
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => refetch()}
                >
                  {t("usersPage.form.edit.retry")}
                </Button>
              )}
              <Button type="button" onClick={goBack}>
                {t("usersPage.form.edit.back")}
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
          {t("usersPage.form.editTitle")}
        </h1>
        <p className="mt-1 text-sm text-gate-control-light-text-secondary dark:text-gate-control-dark-text-secondary">
          {t("usersPage.form.editSubtitle", {
            name: user.name,
            interpolation: { escapeValue: false },
          })}
        </p>
      </header>

      <UserForm
        key={user.id}
        mode="edit"
        initialValues={initialValues}
        isSelf={user.id === me?.id}
        submitLabel={t("usersPage.form.actions.save")}
        onSubmit={handleSubmit}
        onCancel={goBack}
        isSubmitting={isSaving}
      />
    </div>
  );
}
