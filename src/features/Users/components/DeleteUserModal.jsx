import { useTranslation } from "react-i18next";
import { LuTrash2 } from "react-icons/lu";
import ConfirmModal from "../../../shared/components/ui/ConfirmModal";
import { useDeleteUser } from "../hooks/useUserMutations";

export default function DeleteUserModal({ user, onClose }) {
  const { t } = useTranslation();
  const { mutate, isPending, error } = useDeleteUser();

  // The server explains WHY with a code (cannot_delete_self, last_admin...)
  const errorText = error
    ? t(`usersPage.delete.errors.${error.data?.code}`, {
        defaultValue: t("usersPage.delete.errors.generic"),
      })
    : null;

  return (
    <ConfirmModal
      icon={LuTrash2}
      title={t("usersPage.delete.title")}
      description={t("usersPage.delete.text", {
        name: user.name,
        email: user.email,
        interpolation: { escapeValue: false },
      })}
      confirmLabel={t("usersPage.delete.confirm")}
      cancelLabel={t("usersPage.delete.cancel")}
      isPending={isPending}
      error={errorText}
      onConfirm={() => mutate(user.id, { onSuccess: onClose })}
      onClose={onClose}
    />
  );
}
