import sse_logo from "../../assets/logo/sse_icon.png";

function NavBar({
  t,
  active,
  onNavigate,
  open,
  onClose,
  dark,
  onToggleTheme,
  lang,
  onChangingLang,
  logoSrc,
}) {
  return (
    <>
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`fixed inset-0 z-30 bg-slate-900/40 backdrop-blur-[1px] transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 max-w-[85vw] flex-col border-r border-slate-200 bg-white transition-transform duration-300 ease-out dark:border-slate-800 dark:bg-slate-900 lg:static lg:z-auto lg:max-w-none lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={t.closeMenu}
          className="absolute right-3 top-3 rounded-lg p-2 text-slate-500 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:text-slate-400 dark:hover:bg-slate-800 lg:hidden"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex flex-col items-center gap-3 px-6 pb-4 pt-8 text-center">
          {logoSrc ? (
            <img src={sse_logo} alt="" className="h-20 w-auto object-contain" />
          ) : (
            <div className="flex h-20 w-16 items-center justify-center rounded-b-3xl rounded-t-lg bg-emerald-700 text-white shadow-sm">
              <Shield className="h-9 w-9" />
            </div>
          )}
          <h1 className="text-base font-bold leading-tight text-slate-900 dark:text-slate-50">
            {t.appName}
          </h1>
        </div>

        <p className="px-6 pb-5 pt-2 text-center text-sm font-semibold text-slate-600 dark:text-slate-300">
          {t.gate}
        </p>

        <nav className="flex-1 overflow-y-auto px-3" aria-label={t.section}>
          <p className="px-3 pb-2 text-xs font-medium uppercase tracking-wide text-slate-400 dark:text-slate-500">
            {t.section}
          </p>
          <ul className="space-y-1">
            {NAV_ITEMS.map(({ id, icon: Icon }) => {
              const isActive = id === active;
              return (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => onNavigate(id)}
                    aria-current={isActive ? "page" : undefined}
                    className={`group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                      isActive
                        ? "bg-emerald-100/70 font-semibold text-slate-900 dark:bg-emerald-500/15 dark:text-emerald-50"
                        : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                    }`}
                  >
                    <Icon
                      className={`h-5 w-5 shrink-0 ${
                        isActive
                          ? "text-emerald-700 dark:text-emerald-400"
                          : "text-slate-500 dark:text-slate-400"
                      }`}
                      strokeWidth={1.75}
                    />
                    <span className="flex-1 truncate">{t[id]}</span>
                    {isActive && (
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="space-y-3 px-4 pb-4 pt-4"></div>

        <div className="border-t border-slate-100 px-6 py-4 dark:border-slate-800">
          <p className="text-sm font-bold text-slate-900 dark:text-slate-50">
            {t.role}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">{t.user}</p>
          <button
            type="button"
            className="mt-4 flex items-center gap-3 rounded-lg py-1 text-sm text-slate-500 transition-colors hover:text-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:text-slate-400 dark:hover:text-red-400"
          >
            <LogOut className="h-5 w-5" strokeWidth={1.75} />
            {t.logout}
          </button>
        </div>
      </aside>
    </>
  );
}

export default NavBar;
