import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  LuCalendarDays,
  LuChevronDown,
  LuChevronLeft,
  LuChevronRight,
} from "react-icons/lu";
import {
  addDays,
  buildMonthGrid,
  formatDateRange,
  parseISODate,
  toISODate,
  todayISO,
} from "../../utils/dates";

const monthOf = (iso) => {
  const date = parseISODate(iso);
  return { year: date.getFullYear(), month: date.getMonth() };
};

const NAV_BUTTON =
  "inline-flex h-8 w-8 items-center justify-center rounded-full text-gate-control-light-text-secondary transition-colors hover:bg-gate-control-light-surface-selected focus:outline-none focus-visible:ring-2 focus-visible:ring-gate-control-light-accent-primary disabled:cursor-not-allowed disabled:opacity-30 dark:text-gate-control-dark-text-secondary dark:hover:bg-gate-control-dark-surface-selected dark:focus-visible:ring-gate-control-dark-accent-primary cursor-pointer";

export default function DateRangePicker({
  title,
  value,
  onChange,
  placeholder,
}) {
  const { t } = useTranslation();
  const locale = t("locale");
  const triggerId = useId();
  const rootRef = useRef(null);
  const triggerRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState({ from: "", to: "" }); // range being picked
  const [hovered, setHovered] = useState("");
  const [view, setView] = useState(() => monthOf(value.from || todayISO()));

  const today = todayISO();
  const now = new Date();
  const isCurrentMonth =
    view.year === now.getFullYear() && view.month === now.getMonth();

  const weekdays = useMemo(() => {
    const format = new Intl.DateTimeFormat(locale, { weekday: "short" });
    // 1 Jan 2024 was a Monday
    return Array.from({ length: 7 }, (_, i) =>
      format.format(new Date(2024, 0, 1 + i)),
    );
  }, [locale]);

  const monthLabel = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        month: "long",
        year: "numeric",
      }).format(new Date(view.year, view.month, 1)),
    [locale, view],
  );
  const dayFormat = useMemo(
    () => new Intl.DateTimeFormat(locale, { dateStyle: "full" }),
    [locale],
  );
  const cells = useMemo(() => buildMonthGrid(view.year, view.month), [view]);

  useEffect(() => {
    if (!open) return undefined;
    const onMouseDown = (e) => {
      if (!rootRef.current?.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const openPicker = () => {
    setDraft({ from: value.from, to: value.to });
    setView(monthOf(value.from || todayISO()));
    setHovered("");
    setOpen(true);
  };

  const apply = (range) => {
    onChange(range);
    setOpen(false);
  };

  const selectDay = (iso) => {
    if (!draft.from || draft.to) {
      setDraft({ from: iso, to: "" });
      return;
    }
    apply(
      iso < draft.from
        ? { from: iso, to: draft.from }
        : { from: draft.from, to: iso },
    );
  };

  const goToMonth = (delta) =>
    setView(({ year, month }) => {
      const next = new Date(year, month + delta, 1);
      return { year: next.getFullYear(), month: next.getMonth() };
    });

  const end = draft.to || (draft.from ? hovered : "");
  const first = draft.from && end && end < draft.from ? end : draft.from;
  const last = draft.from && end && end > draft.from ? end : draft.from;

  const presets = [
    { key: "today", range: { from: today, to: today } },
    {
      key: "last7",
      range: { from: toISODate(addDays(new Date(), -6)), to: today },
    },
    {
      key: "last30",
      range: { from: toISODate(addDays(new Date(), -29)), to: today },
    },
  ];

  const label = value.from
    ? formatDateRange(value.from, value.to || value.from, locale)
    : placeholder;

  return (
    <div ref={rootRef} className="relative space-y-1.5">
      {title && (
        <label
          htmlFor={triggerId}
          className="block text-sm font-semibold text-gate-control-light-text-primary dark:text-gate-control-dark-text-primary"
        >
          {title}
        </label>
      )}

      <button
        ref={triggerRef}
        id={triggerId}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => (open ? setOpen(false) : openPicker())}
        className="flex w-full items-center gap-3 rounded-control border border-gate-control-light-border-subtle bg-gate-control-light-surface-input px-3 py-3 text-left text-sm focus:outline-none focus:ring-1 focus:ring-gate-control-light-accent-primary dark:border-gate-control-dark-border-subtle dark:bg-gate-control-dark-surface-input dark:focus:ring-gate-control-dark-accent-primary"
      >
        <LuCalendarDays
          size={18}
          aria-hidden="true"
          className="shrink-0 text-gate-control-light-text-secondary dark:text-gate-control-dark-text-secondary"
        />
        <span
          className={`flex-1 truncate ${
            value.from
              ? "text-gate-control-light-text-primary dark:text-gate-control-dark-text-primary"
              : "text-gate-control-light-text-secondary dark:text-gate-control-dark-text-secondary"
          }`}
        >
          {label}
        </span>
        <LuChevronDown
          size={18}
          aria-hidden="true"
          className="shrink-0 text-gate-control-light-text-secondary dark:text-gate-control-dark-text-secondary"
        />
      </button>

      {open && (
        <div
          role="dialog"
          aria-label={t("common.dateRange.dialog")}
          className="absolute left-0 top-full z-30 mt-2 w-[19rem] max-w-[calc(100vw-2rem)] space-y-4 rounded-control border border-gate-control-light-border-glass bg-gate-control-light-surface-modal p-4 shadow-xl backdrop-blur-xl dark:border-gate-control-dark-border-glass dark:bg-gate-control-dark-surface-modal"
        >
          <div className="flex flex-wrap gap-2">
            {presets.map((preset) => (
              <button
                key={preset.key}
                type="button"
                onClick={() => apply(preset.range)}
                className="rounded-full border border-gate-control-light-border-subtle px-3 py-1 text-xs font-medium text-gate-control-light-text-primary transition-colors hover:bg-gate-control-light-surface-selected focus:outline-none focus-visible:ring-2 focus-visible:ring-gate-control-light-accent-primary dark:border-gate-control-dark-border-subtle dark:text-gate-control-dark-text-primary dark:hover:bg-gate-control-dark-surface-selected dark:focus-visible:ring-gate-control-dark-accent-primary cursor-pointer"
              >
                {t(`common.dateRange.${preset.key}`)}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => goToMonth(-1)}
              aria-label={t("common.dateRange.previousMonth")}
              className={NAV_BUTTON}
            >
              <LuChevronLeft size={16} aria-hidden="true" />
            </button>
            <p
              aria-live="polite"
              className="text-sm font-semibold capitalize text-gate-control-light-text-primary dark:text-gate-control-dark-text-primary"
            >
              {monthLabel}
            </p>
            <button
              type="button"
              onClick={() => goToMonth(1)}
              disabled={isCurrentMonth}
              aria-label={t("common.dateRange.nextMonth")}
              className={NAV_BUTTON}
            >
              <LuChevronRight size={16} aria-hidden="true" />
            </button>
          </div>

          <div>
            <div className="grid grid-cols-7 pb-1 text-center text-[11px] font-medium uppercase text-gate-control-light-text-secondary dark:text-gate-control-dark-text-secondary">
              {weekdays.map((day) => (
                <span key={day}>{day}</span>
              ))}
            </div>

            <div
              className="grid grid-cols-7"
              onMouseLeave={() => setHovered("")}
            >
              {cells.map((iso, index) => {
                if (!iso) return <span key={`empty-${index}`} />;

                const isEdge = iso === first || iso === last;
                const inRange = first && last && iso > first && iso < last;

                return (
                  <button
                    key={iso}
                    type="button"
                    disabled={iso > today}
                    onClick={() => selectDay(iso)}
                    onMouseEnter={() => setHovered(iso)}
                    aria-label={dayFormat.format(parseISODate(iso))}
                    aria-pressed={isEdge}
                    className={`h-9 text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gate-control-light-accent-primary disabled:cursor-not-allowed disabled:opacity-30 dark:focus-visible:ring-gate-control-dark-accent-primary cursor-pointer ${
                      isEdge
                        ? "rounded-full bg-gate-control-light-accent-primary font-semibold text-gate-control-light-text-on-accent dark:bg-gate-control-dark-accent-primary dark:text-gate-control-dark-text-on-accent"
                        : inRange
                          ? "bg-gate-control-light-surface-selected text-gate-control-light-text-primary dark:bg-gate-control-dark-surface-selected dark:text-gate-control-dark-text-primary"
                          : "rounded-full text-gate-control-light-text-primary hover:bg-gate-control-light-surface-selected dark:text-gate-control-dark-text-primary dark:hover:bg-gate-control-dark-surface-selected"
                    } ${iso === today && !isEdge ? "font-bold" : ""}`}
                  >
                    {Number(iso.slice(8))}
                  </button>
                );
              })}
            </div>
          </div>

          {value.from && (
            <button
              type="button"
              onClick={() => apply({ from: "", to: "" })}
              className="text-xs font-medium text-gate-control-light-text-secondary underline hover:text-gate-control-light-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-gate-control-light-accent-primary dark:text-gate-control-dark-text-secondary dark:hover:text-gate-control-dark-text-primary dark:focus-visible:ring-gate-control-dark-accent-primary"
            >
              {t("common.dateRange.clear")}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
