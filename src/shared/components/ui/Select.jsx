import { useId } from "react";
import { LuChevronDown } from "react-icons/lu";

export default function Select({
  title,
  name,
  value,
  onChange,
  options,
  placeholder,
  error,
  disabled = false,
  muteEmpty = true,
  className = "",
  ...props
}) {
  const id = useId();
  const errorId = `${id}-error`;
  const muted = value === "" && muteEmpty;

  return (
    <div className="space-y-1.5">
      {title && (
        <label
          htmlFor={id}
          className="block text-sm font-semibold text-gate-control-light-text-primary dark:text-gate-control-dark-text-primary"
        >
          {title}
        </label>
      )}

      <div className="relative">
        <select
          id={id}
          name={name}
          value={value}
          disabled={disabled}
          onChange={onChange}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          {...props}
          className={`w-full cursor-pointer appearance-none rounded-control border bg-gate-control-light-surface-input px-3 py-3 pr-10 text-sm focus:outline-none focus:ring-1 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-gate-control-dark-surface-input dark:scheme-dark ${
            muted
              ? "text-gate-control-light-text-secondary dark:text-gate-control-dark-text-secondary"
              : "text-gate-control-light-text-primary dark:text-gate-control-dark-text-primary"
          } ${
            error
              ? "border-gate-control-light-status-danger-text focus:ring-gate-control-light-status-danger-text dark:border-gate-control-dark-status-danger-text dark:focus:ring-gate-control-dark-status-danger-text"
              : "border-gate-control-light-border-subtle focus:ring-gate-control-light-accent-primary dark:border-gate-control-dark-border-subtle dark:focus:ring-gate-control-dark-accent-primary"
          } ${className}`}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="text-gate-control-light-text-primary dark:text-gate-control-dark-text-primary"
            >
              {option.label}
            </option>
          ))}
        </select>
        <LuChevronDown
          size={18}
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gate-control-light-text-secondary dark:text-gate-control-dark-text-secondary"
        />
      </div>

      {error && (
        <p
          id={errorId}
          role="alert"
          className="text-xs text-gate-control-light-status-danger-text dark:text-gate-control-dark-status-danger-text"
        >
          {error}
        </p>
      )}
    </div>
  );
}
