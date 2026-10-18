import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { LuSun } from "react-icons/lu";

import { FaRegMoon } from "react-icons/fa";
import { toggleTheme } from "../../../store/settingsSlice";

function ThemeSelector() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const dark = useSelector((state) => state.settings.theme === "dark");

  return (
    <button
      type="button"
      onClick={() => dispatch(toggleTheme())}
      aria-pressed={dark}
      className="flex w-full items-center justify-between rounded-control border border-gate-control-light-border-subtle bg-gate-control-light-surface-input px-4 py-2.5 text-sm text-gate-control-light-text-primary transition-colors hover:bg-gate-control-light-surface-selected focus:outline-none focus-visible:ring-2 focus-visible:ring-gate-control-light-accent-primary dark:border-gate-control-dark-border-subtle dark:bg-gate-control-dark-surface-input dark:text-gate-control-dark-text-primary dark:hover:bg-gate-control-dark-surface-selected dark:focus-visible:ring-gate-control-dark-accent-primary cursor-pointer"
    >
      <LuSun
        className={`h-4 w-4 ${dark ? "opacity-40" : ""}`}
        strokeWidth={1.75}
      />
      <span className="font-medium">{dark ? t("dark") : t("light")}</span>
      <FaRegMoon
        className={`h-4 w-4 ${dark ? "" : "opacity-40"}`}
        strokeWidth={1.75}
      />
    </button>
  );
}

export default ThemeSelector;
