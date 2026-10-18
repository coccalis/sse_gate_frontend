import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { LANGUAGES } from "../../../shared/data/languages";
import { FaChevronDown } from "react-icons/fa";

function LanguageSelector() {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const current =
    LANGUAGES.find((l) => l.code === i18n.resolvedLanguage) ?? LANGUAGES[0];
  const language = useSelector((state) => state.settings.language);

  return (
    <label className="relative flex w-full cursor-pointer items-center rounded-control border border-gate-control-light-border-subtle bg-gate-control-light-surface-input px-4 py-2.5 text-sm text-gate-control-light-text-primary transition-colors hover:bg-gate-control-light-surface-selected focus-within:ring-2 focus-within:ring-gate-control-light-accent-primary dark:border-gate-control-dark-border-subtle dark:bg-gate-control-dark-surface-input dark:text-gate-control-dark-text-primary dark:hover:bg-gate-control-dark-surface-selected dark:focus-within:ring-gate-control-dark-accent-primary">
      <span className="text-base leading-none" aria-hidden="true">
        {current.flag}
      </span>
      <span className="flex-1 text-center font-medium">{current.label}</span>
      <FaChevronDown
        className="h-4 w-4 text-gate-control-light-text-secondary dark:text-gate-control-dark-text-secondary"
        aria-hidden="true"
      />

      <select
        value={current.code}
        onChange={(e) => i18n.changeLanguage(e.target.value)}
        aria-label={t("language")}
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0 bg-gate-control-light-surface-input dark:bg-gate-control-dark-surface-input"
      >
        {LANGUAGES.map((l) => (
          <option key={l.code} value={l.code}>
            {l.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export default LanguageSelector;
