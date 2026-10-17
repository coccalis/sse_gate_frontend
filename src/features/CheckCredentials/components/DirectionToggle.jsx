import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { LuLogIn, LuLogOut } from "react-icons/lu";
import { setDirection } from "../../../store/checkSlice";

const OPTIONS = [
  { value: "entry", icon: LuLogIn },
  { value: "exit", icon: LuLogOut },
];

export default function DirectionToggle() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const direction = useSelector((state) => state.check.direction);

  return (
    <div
      role="radiogroup"
      aria-label={t("gateCheck.direction.label")}
      className="inline-flex shrink-0 rounded-full border border-gate-control-light-border-subtle bg-gate-control-light-surface-input p-1 dark:border-gate-control-dark-border-subtle dark:bg-gate-control-dark-surface-input"
    >
      {OPTIONS.map(({ value, icon: Icon }) => {
        const selected = direction === value;
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => dispatch(setDirection(value))}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gate-control-light-accent-primary dark:focus-visible:ring-gate-control-dark-accent-primary ${
              selected
                ? "bg-gate-control-light-accent-primary text-gate-control-light-text-on-accent dark:bg-gate-control-dark-accent-primary dark:text-gate-control-dark-text-on-accent"
                : "text-gate-control-light-text-secondary hover:text-gate-control-light-text-primary dark:text-gate-control-dark-text-secondary dark:hover:text-gate-control-dark-text-primary"
            }`}
          >
            <Icon size={16} aria-hidden="true" />
            {t(`gateCheck.direction.${value}`)}
          </button>
        );
      })}
    </div>
  );
}
