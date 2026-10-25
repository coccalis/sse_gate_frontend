import { useEffect, useId } from "react";
import { createPortal } from "react-dom";
import Button from "./Button";

// Generic "are you sure?" dialog (danger style).
//   icon            icon component shown in the red circle
//   onConfirm       () => void   (the parent runs the mutation)
//   isPending       blocks closing and shows the spinner on the confirm button
//   error           already-translated message, or null
export default function ConfirmModal({
  icon: Icon,
  title,
  description,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onClose,
  isPending = false,
  error = null,
}) {
  const titleId = useId();
  const textId = useId();

  // Escape closes the dialog (not while working)
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && !isPending) onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isPending, onClose]);

  // Portal: the glass cards use backdrop-blur, which would trap a `fixed`
  // element inside the card instead of covering the whole screen.
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
          {Icon && (
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gate-control-light-status-danger-surface text-gate-control-light-status-danger-text dark:bg-gate-control-dark-status-danger-surface dark:text-gate-control-dark-status-danger-text">
              <Icon size={20} aria-hidden="true" />
            </div>
          )}

          <div className="space-y-1">
            <h2
              id={titleId}
              className="text-lg font-semibold text-gate-control-light-text-primary dark:text-gate-control-dark-text-primary"
            >
              {title}
            </h2>
            <p
              id={textId}
              className="text-sm text-gate-control-light-text-secondary dark:text-gate-control-dark-text-secondary"
            >
              {description}
            </p>
          </div>
        </div>

        {error && (
          <p
            role="alert"
            className="text-sm text-gate-control-light-status-danger-text dark:text-gate-control-dark-status-danger-text"
          >
            {error}
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
            {cancelLabel}
          </Button>
          <Button type="button" variant="danger" loading={isPending} onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
}
