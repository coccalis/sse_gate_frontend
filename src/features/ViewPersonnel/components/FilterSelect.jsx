import { LuChevronDown } from "react-icons/lu";

// options: [{ value, label }]. value "" means "all".
export default function FilterSelect({ label, allLabel, value, onChange, options }) {
  return (
    <div className="relative">
      <select
        aria-label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full cursor-pointer appearance-none rounded-control border border-gate-control-light-border-subtle bg-gate-control-light-surface-input px-4 py-3 pr-10 text-sm text-gate-control-light-text-primary focus:outline-none focus:ring-1 focus:ring-gate-control-light-accent-primary dark:border-gate-control-dark-border-subtle dark:bg-gate-control-dark-surface-input dark:text-gate-control-dark-text-primary dark:focus:ring-gate-control-dark-accent-primary dark:[color-scheme:dark]"
      >
        <option value="">{allLabel}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
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
  );
}
