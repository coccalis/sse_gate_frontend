import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import UserForm from "../features/Users/components/UserForm";
import { useCreateUser } from "../features/Users/hooks/useUserMutations";

const LIST_PATH = "/admin/users";

export default function CreateUserPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useCreateUser();

  // If this throws, the form shows the error (409 email_exists on the email field)
  const handleSubmit = async (payload) => {
    await mutateAsync(payload);
    navigate(LIST_PATH);
  };

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6">
      <header>
        <h1 className="text-3xl font-semibold text-gate-control-light-text-primary dark:text-gate-control-dark-text-primary">
          {t("usersPage.form.createTitle")}
        </h1>
        <p className="mt-1 text-sm text-gate-control-light-text-secondary dark:text-gate-control-dark-text-secondary">
          {t("usersPage.form.createSubtitle")}
        </p>
      </header>

      <UserForm
        mode="create"
        submitLabel={t("usersPage.form.actions.create")}
        onSubmit={handleSubmit}
        onCancel={() => navigate(LIST_PATH)}
        isSubmitting={isPending}
      />
    </div>
  );
}
