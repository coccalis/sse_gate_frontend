import { LuLoaderCircle } from "react-icons/lu";

const VARIANTS = {
  primary:
    "bg-gate-control-light-accent-primary text-gate-control-light-text-on-accent hover:opacity-90",
  secondary:
    "border border-gate-control-light-border-subtle bg-gate-control-light-surface-glass text-gate-control-light-text-primary hover:bg-gate-control-light-surface-selected",
  danger:
    "bg-gate-control-light-status-danger-surface text-gate-control-light-status-danger-text hover:opacity-80",
  ghost:
    "bg-gate-control-light-surface-transparent text-gate-control-light-text-primary hover:bg-gate-control-light-surface-selected",
};

const SIZES = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-5 py-3 text-base",
};

function Button({
  children,
  type = "button", // "button" | "submit" | "reset"
  variant = "primary", // "primary" | "secondary" | "danger" | "ghost"
  size = "md", // "sm" | "md" | "lg"
  icon: Icon,
  loading = false,
  fullWidth = false,
  disabled,
  className = "",
  ...props
}) {
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      className={`inline-flex items-center justify-center gap-2 rounded-control font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-gate-control-light-accent-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 hover:cursor-pointer ${
        VARIANTS[variant] ?? VARIANTS.primary
      } ${SIZES[size] ?? SIZES.md} ${fullWidth ? "w-full" : ""} ${className}`}
      {...props}
    >
      {loading ? (
        <LuLoaderCircle size={16} className="animate-spin" aria-hidden="true" />
      ) : (
        Icon && <Icon size={16} aria-hidden="true" />
      )}
      {children}
    </button>
  );
}

export default Button;
