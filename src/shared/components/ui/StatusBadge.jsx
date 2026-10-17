const TONES = {
  neutral:
    "bg-gate-control-light-status-neutral-surface text-gate-control-light-text-secondary dark:bg-gate-control-dark-status-neutral-surface dark:text-gate-control-dark-text-secondary",
  positive:
    "bg-gate-control-light-status-positive-surface text-gate-control-light-status-positive-text dark:bg-gate-control-dark-status-positive-surface dark:text-gate-control-dark-status-positive-text",
  danger:
    "bg-gate-control-light-status-danger-surface text-gate-control-light-status-danger-text dark:bg-gate-control-dark-status-danger-surface dark:text-gate-control-dark-status-danger-text",
  warning:
    "bg-gate-control-light-surface-warning text-gate-control-light-status-warning-text dark:bg-gate-control-dark-surface-warning dark:text-gate-control-dark-status-warning-text",
};

export default function StatusBadge({
  tone = "neutral",
  icon: Icon,
  children,
  className = "",
}) {
  return (
    <span
      className={`inline-flex max-w-full items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
        TONES[tone] ?? TONES.neutral
      } ${className}`}
    >
      {Icon && <Icon size={14} aria-hidden="true" />}
      {children}
    </span>
  );
}
