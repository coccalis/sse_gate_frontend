import { useTranslation } from "react-i18next";
import { LuCircleCheck, LuScanLine, LuShieldCheck } from "react-icons/lu";

const ROLES = [
  { value: "admin", icon: LuShieldCheck },
  { value: "operator", icon: LuScanLine },
];

// Two cards with a short description of each role, built on real radio
// inputs, so keyboard and screen readers work. `disabled` locks both.
export default function RoleSelector({ value, onChange, disabled = false }) {
  const { t } = useTranslation();

  return (
    <fieldset disabled={disabled}>
      <legend className="sr-only">{t("usersPage.form.fields.role")}</legend>

      <div className="grid gap-4 sm:grid-cols-2">
        {ROLES.map(({ value: role, icon: Icon }) => {
          const selected = value === role;
          return (
            <label
              key={role}
              className={`block ${disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
            >
              <input
                type="radio"
                name="role"
                value={role}
                checked={selected}
                onChange={() => onChange(role)}
                className="peer sr-only"
              />
              <span
                className={`flex h-full items-start gap-4 rounded-control border p-5 text-gate-control-light-text-primary transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-gate-control-light-accent-primary dark:text-gate-control-dark-text-primary dark:peer-focus-visible:ring-gate-control-dark-accent-primary ${
                  selected
                    ? "border-gate-control-light-accent-primary bg-gate-control-light-surface-selected dark:border-gate-control-dark-accent-primary dark:bg-gate-control-dark-surface-selected"
                    : "border-gate-control-light-border-subtle bg-gate-control-light-surface-input dark:border-gate-control-dark-border-subtle dark:bg-gate-control-dark-surface-input"
                } ${disabled ? "" : selected ? "" : "hover:bg-gate-control-light-surface-selected/60 dark:hover:bg-gate-control-dark-surface-selected/60"}`}
              >
                <Icon size={24} aria-hidden="true" className="mt-0.5 shrink-0" />
                <span className="space-y-1">
                  <span className="flex items-center gap-2 text-sm font-semibold">
                    {t(`usersPage.form.roles.${role}.title`)}
                    {selected && (
                      <LuCircleCheck
                        size={18}
                        aria-hidden="true"
                        className="text-gate-control-light-status-positive-text dark:text-gate-control-dark-status-positive-text"
                      />
                    )}
                  </span>
                  <span className="block text-xs leading-5 text-gate-control-light-text-secondary dark:text-gate-control-dark-text-secondary">
                    {t(`usersPage.form.roles.${role}.description`)}
                  </span>
                </span>
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
