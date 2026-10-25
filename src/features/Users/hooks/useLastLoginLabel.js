import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { toISODate, todayISO } from "../../../shared/utils/dates";

// "Today, 08:02"  |  "10 Oct, 13:55"  |  "10 Oct 2025, 13:55"  |  "Never"
export function useLastLoginLabel() {
  const { t } = useTranslation();
  const locale = t("locale");

  const formats = useMemo(
    () => ({
      time: new Intl.DateTimeFormat(locale, { hour: "2-digit", minute: "2-digit", hour12: false }),
      dayMonth: new Intl.DateTimeFormat(locale, { day: "2-digit", month: "short" }),
      full: new Intl.DateTimeFormat(locale, { day: "2-digit", month: "short", year: "numeric" }),
    }),
    [locale]
  );

  return useCallback(
    (iso) => {
      if (!iso) return t("usersPage.lastLogin.never");

      const when = new Date(iso);
      const time = formats.time.format(when);
      if (toISODate(when) === todayISO()) return t("usersPage.lastLogin.today", { time });

      const sameYear = when.getFullYear() === new Date().getFullYear();
      const date = (sameYear ? formats.dayMonth : formats.full).format(when);
      return t("usersPage.lastLogin.other", { date, time });
    },
    [t, formats]
  );
}
