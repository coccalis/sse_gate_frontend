import { useEffect, useId } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { LuTrash2 } from "react-icons/lu";
import Button from "../../../shared/components/ui/Button";
import { useDeletePersonnel } from "../hooks/usePersonnel";

export default function DeletePersonnelModal({ person, onClose }) {
  const { t } = useTranslation();
  const titleId = useId();
  const textId = useId();
  const { mutate, isPending, isError } = useDeletePersonnel();

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && !isPending) onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isPending, onClose]);

  const handleConfirm = () => mutate(person.id, { onSuccess: onClose });

  return createPortal(
    <div
      onMouseDown={(e) => {
        if (e.target === e.currentTarget && !isPending) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gate-control-light-overlay-backdrop p-4 backdrop-blur-[2px] dark:bg-gate-control-dark-overlay-backdrop"
    >
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={textId}
        className="w-full max-w-md space-y-5 rounded-control border border-gate-control-light-border-glass bg-gate-control-light-surface-modal p-6 shadow-xl backdrop-blur-xl dark:border-gate-control-dark-border-glass dark:bg-gate-control-dark-surface-modal"
      >
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gate-control-light-status-danger-surface text-gate-control-light-status-danger-text dark:bg-gate-control-dark-status-danger-surface dark:text-gate-control-dark-status-danger-text">
            <LuTrash2 size={20} aria-hidden="true" />
          </div>

          <div className="space-y-1">
            <h2
              id={titleId}
              className="text-lg font-semibold text-gate-control-light-text-primary dark:text-gate-control-dark-text-primary"
            >
              {t("personnelList.delete.title")}
            </h2>
            <p
              id={textId}
              className="text-sm text-gate-control-light-text-secondary dark:text-gate-control-dark-text-secondary"
            >
              {t("personnelList.delete.text", {
                name: person.fullName,
                cardId: person.cardId,
                interpolation: { escapeValue: false },
              })}
            </p>
          </div>
        </div>

        {isError && (
          <p
            role="alert"
            className="text-sm text-gate-control-light-status-danger-text dark:text-gate-control-dark-status-danger-text"
          >
            {t("personnelList.delete.error")}
          </p>
        )}

        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="secondary"
            autoFocus
            disabled={isPending}
            onClick={onClose}
          >
            {t("personnelList.delete.cancel")}
          </Button>
          <Button
            type="button"
            variant="danger"
            loading={isPending}
            onClick={handleConfirm}
          >
            {t("personnelList.delete.confirm")}
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
