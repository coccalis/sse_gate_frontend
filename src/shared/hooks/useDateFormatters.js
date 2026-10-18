import { useMemo } from "react";
import { useTranslation } from "react-i18next";

// "11 Οκτ 2026" and "09:42", following the current language
export function useDateFormatters() {
  const { t } = useTranslation();
  const locale = t("locale");

  return useMemo(
    () => ({
      date: new Intl.DateTimeFormat(locale, {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      time: new Intl.DateTimeFormat(locale, {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
    }),
    [locale]
  );
}
