function languageSelector() {
  return (
    <div>
      <label className="relative flex w-full cursor-pointer items-center rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-700 focus-within:ring-2 focus-within:ring-emerald-500 dark:border-slate-700 dark:text-slate-200">
        <span className="text-base leading-none" aria-hidden="true">
          {currentLang.flag}
        </span>
        <span className="flex-1 text-center font-medium">
          {currentLang.label}
        </span>
        <ChevronDown className="h-4 w-4 text-slate-400" />
        <select
          value={lang}
          onChange={(e) => onChangeLang(e.target.value)}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          aria-label="Language"
        >
          {LANGUAGES.map((l) => (
            <option key={l.code} value={l.code}>
              {l.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

export default languageSelector;
