import { useTranslation } from "react-i18next";
import { LuCar } from "react-icons/lu";
import { FaMotorcycle } from "react-icons/fa";
import GlassCard from "../../../shared/components/ui/GlassCard";
import Avatar from "../../../shared/components/ui/Avatar";
import StatusBadge from "../../../shared/components/ui/StatusBadge";
import { useDateFormatters } from "../../../shared/hooks/useDateFormatters";
import { addDays, toISODate, todayISO } from "../../../shared/utils/dates";
import { formatPlate } from "../../CheckCredentials/utils/plate";
import { useLastEvent } from "../hooks/useLogs";
import { useSearchedPerson } from "../hooks/useSearchedPerson";

const VEHICLE_ICONS = { car: LuCar, motorcycle: FaMotorcycle };

const LABEL =
  "text-xs text-gate-control-light-text-secondary dark:text-gate-control-dark-text-secondary";

export default function PersonProfileCard() {
  const person = useSearchedPerson();
  return person ? <ProfileContent person={person} /> : null;
}

function ProfileContent({ person }) {
  const { t } = useTranslation();
  const formats = useDateFormatters();
  const { data: lastEvent } = useLastEvent(person.id);
  const isInside = person.status === "inside";

  let since = null;
  if (lastEvent) {
    const when = new Date(lastEvent.timestamp);
    const time = formats.time.format(when);
    const day = toISODate(when);

    if (day === todayISO()) {
      since = t("logsPage.profile.sinceToday", { time });
    } else if (day === toISODate(addDays(new Date(), -1))) {
      since = t("logsPage.profile.sinceYesterday", { time });
    } else {
      since = t("logsPage.profile.sinceDate", {
        date: formats.date.format(when),
        time,
      });
    }
  }

  return (
    <GlassCard className="grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1.2fr)_auto] lg:items-center">
      <div className="flex items-center gap-5">
        <Avatar
          photoUrl={person.photoUrl}
          name={person.fullName}
          className="h-32 w-24 text-3xl"
        />
        <div className="min-w-0 space-y-1">
          <h2 className="truncate text-2xl font-semibold text-gate-control-light-text-primary dark:text-gate-control-dark-text-primary">
            {person.fullName}
          </h2>
          <p className="text-sm text-gate-control-light-text-secondary dark:text-gate-control-dark-text-secondary">
            {[person.rank, person.unit].filter(Boolean).join(" · ")}
          </p>
          <p className={LABEL}>{person.cardId}</p>
        </div>
      </div>

      <div>
        <p className={LABEL}>{t("logsPage.profile.vehicles")}</p>
        {person.vehicles.length === 0 ? (
          <p className="mt-2 text-sm text-gate-control-light-text-secondary dark:text-gate-control-dark-text-secondary">
            {t("logsPage.profile.noVehicles")}
          </p>
        ) : (
          <ul className="mt-2 space-y-2 text-sm text-gate-control-light-text-primary dark:text-gate-control-dark-text-primary">
            {person.vehicles.map((vehicle) => {
              const Icon = VEHICLE_ICONS[vehicle.type] ?? LuCar;
              const details = [
                formatPlate(vehicle.plate),
                [vehicle.make, vehicle.model].filter(Boolean).join(" "),
                vehicle.color &&
                  t(`personnelForm.colors.${vehicle.color}`, {
                    defaultValue: vehicle.color,
                  }),
              ].filter(Boolean);

              return (
                <li key={vehicle.plate} className="flex items-center gap-2">
                  <Icon
                    size={16}
                    aria-hidden="true"
                    className="shrink-0 text-gate-control-light-text-secondary dark:text-gate-control-dark-text-secondary"
                  />
                  {details.join(" · ")}
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <div className="space-y-2 lg:text-right">
        <p className={LABEL}>{t("logsPage.profile.currentStatus")}</p>
        <StatusBadge tone={isInside ? "positive" : "neutral"}>
          {t(`logsPage.profile.${isInside ? "inside" : "outside"}`)}
        </StatusBadge>
        {since && <p className={`${LABEL} pt-1`}>{since}</p>}
      </div>
    </GlassCard>
  );
}
