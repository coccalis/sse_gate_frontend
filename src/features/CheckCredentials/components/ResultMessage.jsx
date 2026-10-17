// Centered icon + title + text. Used for the waiting, denied and error states.
const ICON_TONES = {
  neutral:
    "text-gate-control-light-text-secondary dark:text-gate-control-dark-text-secondary",
  danger:
    "text-gate-control-light-status-danger-text dark:text-gate-control-dark-status-danger-text",
  warning:
    "text-gate-control-light-status-warning-text dark:text-gate-control-dark-status-warning-text",
};

export default function ResultMessage({
  icon: Icon,
  backgroundColor,
  tone = "neutral",
  title,
  description,
  descriptionTip,
  children,
}) {
  return (
    <div
      className={`flex flex-col items-center gap-3 px-4 py-12 text-center ${backgroundColor}  `}
    >
      <Icon
        size={44}
        strokeWidth={1.5}
        className={ICON_TONES[tone]}
        aria-hidden="true"
      />
      <h3 className="text-xl font-semibold text-gate-control-light-text-primary dark:text-gate-control-dark-text-primary">
        {title}
      </h3>
      {description && (
        <>
          <p className="max-w-md text-sm text-gate-control-light-text-secondary dark:text-gate-control-dark-text-secondary">
            {description}
          </p>
          <p className="max-w-md text-sm text-gate-control-light-text-secondary dark:text-gate-control-dark-text-secondary">
            {descriptionTip}
          </p>
        </>
      )}
      {children}
    </div>
  );
}
