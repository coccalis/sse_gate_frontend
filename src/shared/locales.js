// Texts used by shared components. Merge into your i18n.js (key: `common`):
//   import { commonEn, commonEl } from "./shared/locales";
//   en: { translation: { ...existing, common: commonEn } }
//   el: { translation: { ...existing, common: commonEl } }

export const commonEn = {
  pagination: {
    label: "Pagination",
    previous: "Previous page",
    next: "Next page",
    page: "Page {{page}}",
  },
  dateRange: {
    dialog: "Choose dates",
    today: "Today",
    last7: "Last 7 days",
    last30: "Last 30 days",
    clear: "Clear dates",
    previousMonth: "Previous month",
    nextMonth: "Next month",
  },
};

export const commonEl = {
  pagination: {
    label: "Σελιδοποίηση",
    previous: "Προηγούμενη σελίδα",
    next: "Επόμενη σελίδα",
    page: "Σελίδα {{page}}",
  },
  dateRange: {
    dialog: "Επιλογή ημερομηνιών",
    today: "Σήμερα",
    last7: "Τελευταίες 7 ημέρες",
    last30: "Τελευταίες 30 ημέρες",
    clear: "Εκκαθάριση ημερομηνιών",
    previousMonth: "Προηγούμενος μήνας",
    nextMonth: "Επόμενος μήνας",
  },
};
