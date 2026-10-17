import { useId, useState } from "react";
import { FIELD_TYPES } from "../../data/textfield-data";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

function Textfield({
  ref,
  title,
  type = "text", // "text" | "username" | "email" | "tel" | "password"
  placeholder,
  icon,
  error,
  className = "",
  ...props
}) {
  const id = useId();
  const errorId = `${id}-error`;
  const [showPassword, setShowPassword] = useState(false);

  const config = FIELD_TYPES[type] ?? FIELD_TYPES.text;
  const Icon = icon ?? config.icon;
  const isPassword = type === "password";

  const inputType = isPassword && showPassword ? "text" : config.inputType;

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
        {Icon && (
          <Icon
            size={18}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gate-control-light-text-secondary dark:text-gate-control-dark-text-secondary"
          />
        )}

        <input
          ref={ref}
          id={id}
          type={inputType}
          inputMode={config.inputMode}
          autoComplete={config.autoComplete}
          placeholder={placeholder ?? config.placeholder}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          {...props}
          className={`w-full rounded-control border bg-gate-control-light-surface-input py-2 text-sm text-gate-control-light-text-primary placeholder:text-sm placeholder:text-gate-control-light-text-secondary focus:outline-none focus:ring-1 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-gate-control-dark-surface-input dark:text-gate-control-dark-text-primary dark:placeholder:text-gate-control-dark-text-secondary ${
            error
              ? "border-gate-control-light-status-danger-text focus:ring-gate-control-light-status-danger-text dark:border-gate-control-dark-status-danger-text dark:focus:ring-gate-control-dark-status-danger-text"
              : "border-gate-control-light-border-subtle focus:ring-gate-control-light-accent-primary dark:border-gate-control-dark-border-subtle dark:focus:ring-gate-control-dark-accent-primary"
          } ${Icon ? "pl-10" : "pl-3"} ${isPassword ? "pr-10" : "pr-3"} ${className}`}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            aria-pressed={showPassword}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gate-control-light-text-secondary transition-colors hover:text-gate-control-light-text-primary focus:outline-none focus-visible:text-gate-control-light-text-primary dark:text-gate-control-dark-text-secondary dark:hover:text-gate-control-dark-text-primary dark:focus-visible:text-gate-control-dark-text-primary"
          >
            {showPassword ? (
              <FaRegEyeSlash size={18} />
            ) : (
              <FaRegEye size={18} />
            )}
          </button>
        )}
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

export default Textfield;
