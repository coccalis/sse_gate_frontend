function ThemeSelector() {
  return (
    <div>
      <button
        type="button"
        onClick={onToggleTheme}
        className="flex w-full items-center justify-between rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-700 transition-colors hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
      >
        <Sun
          className={`h-4 w-4 ${dark ? "opacity-40" : ""}`}
          strokeWidth={1.75}
        />
        <span className="font-medium">{dark ? t.dark : t.light}</span>
        <Moon
          className={`h-4 w-4 ${dark ? "" : "opacity-40"}`}
          strokeWidth={1.75}
        />
      </button>
    </div>
  );
}

export default ThemeSelector;
