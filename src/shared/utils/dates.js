const pad = (n) => String(n).padStart(2, "0");

export const toISODate = (date) =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

export function parseISODate(iso) {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export const addDays = (date, amount) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate() + amount);

export const todayISO = () => toISODate(new Date());

// Cells of one month, padded with null up to full weeks.
export function buildMonthGrid(year, month, weekStartsOn = 1) {
  const offset = (new Date(year, month, 1).getDay() - weekStartsOn + 7) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells = [
    ...Array(offset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) =>
      toISODate(new Date(year, month, i + 1)),
    ),
  ];
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

// "08–11 Οκτ 2026", "28 Σεπ – 03 Οκτ 2026", "11 Οκτ 2026"
export function formatDateRange(from, to, locale) {
  const start = parseISODate(from);
  const end = parseISODate(to);

  const day = (d) => pad(d.getDate());
  const month = (d) =>
    new Intl.DateTimeFormat(locale, { month: "short" }).format(d);
  const full = (d) =>
    new Intl.DateTimeFormat(locale, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(d);

  if (from === to) return full(start);

  const sameYear = start.getFullYear() === end.getFullYear();
  if (sameYear && start.getMonth() === end.getMonth()) {
    return `${day(start)}–${day(end)} ${month(end)} ${end.getFullYear()}`;
  }
  if (sameYear) return `${day(start)} ${month(start)} – ${full(end)}`;
  return `${full(start)} – ${full(end)}`;
}

// Date shown on the top bar
export function TopBarFullDate(locale, now) {
  return new Intl.DateTimeFormat(locale, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(now);
}
export function TopBarShortDate(locale, now) {
  return new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(now);
}
