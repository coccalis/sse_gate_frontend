// Centered icon + title + text for empty / error states.
// (Same idea as ResultMessage in the check page; you can move that one here
// and delete this file if you prefer a single component.)
const ICON_TONES = {
  neutral:
    "text-gate-control-light-text-secondary dark:text-gate-control-dark-text-secondary",
  danger:
    "text-gate-control-light-status-danger-text dark:text-gate-control-dark-status-danger-text",
  warning:
    "text-gate-control-light-status-warning-text dark:text-gate-control-dark-status-warning-text",
};

export default function StateMessage({
  icon: Icon,
  tone = "neutral",
  title,
  description,
  children,
}) {
  return (
    <div className="flex flex-col items-center gap-3 px-4 py-14 text-center">
      <Icon size={40} strokeWidth={1.5} className={ICON_TONES[tone]} aria-hidden="true" />
      <h3 className="text-lg font-semibold text-gate-control-light-text-primary dark:text-gate-control-dark-text-primary">
        {title}
      </h3>
      {description && (
        <p className="max-w-md text-sm text-gate-control-light-text-secondary dark:text-gate-control-dark-text-secondary">
          {description}
        </p>
      )}
      {children}
    </div>
  );
}
