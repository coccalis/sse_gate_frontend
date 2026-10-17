import { useTranslation } from "react-i18next";
import { LuCar, LuShieldCheck } from "react-icons/lu";
import PersonAvatar from "./PersonAvatar";
import { formatPlate, normalizePlate } from "../utils/plate";

function Field({ label, children }) {
  return (
    <div>
      <dt className="text-xs font-medium uppercase tracking-wide text-gate-control-light-text-secondary dark:text-gate-control-dark-text-secondary">
        {label}
      </dt>
      <dd className="mt-1 text-sm font-medium text-gate-control-light-text-primary dark:text-gate-control-dark-text-primary">
        {children}
      </dd>
    </div>
  );
}

export default function ResultValid({ result }) {
  const { t } = useTranslation();
  const { person, direction, checkedAt, method, value, matchedPlate } = result;

  const name = [person?.firstName, person?.lastName].filter(Boolean).join(" ");
  const subtitle = [person?.rank, person?.unit].filter(Boolean).join(" · ");
  const when = new Intl.DateTimeFormat(t("locale"), {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(checkedAt));

  // Highlight the plate that was checked (when the check was by plate)
  const matched = normalizePlate(
    matchedPlate ?? (method === "plate" ? value : ""),
  );

  return (
    <div className="space-y-6">
      {person && (
        <div className="flex flex-col gap-6 sm:flex-row">
          <PersonAvatar photoUrl={person.photoUrl} name={name} />

          <div className="min-w-0 flex-1 space-y-5">
            <div>
              <h3 className="text-2xl font-semibold text-gate-control-light-text-primary dark:text-gate-control-dark-text-primary">
                {name}
              </h3>
              {subtitle && (
                <p className="text-sm text-gate-control-light-text-secondary dark:text-gate-control-dark-text-secondary">
                  {subtitle}
                </p>
              )}
            </div>

            <dl className="grid gap-4 sm:grid-cols-2">
              {person.cardId && (
                <Field label={t("gateCheck.result.cardNumber")}>
                  {person.cardId}
                </Field>
              )}
            </dl>
            <div className="sm:col-span-2">
              <Field label={t("gateCheck.result.vehicles")}>
                {person.vehicles.length === 0 ? (
                  <span className="font-normal text-gate-control-light-text-secondary dark:text-gate-control-dark-text-secondary">
                    {t("gateCheck.result.noVehicles")}
                  </span>
                ) : (
                  <ul className="flex flex-wrap gap-2">
                    {person.vehicles.map((v) => {
                      const isMatch =
                        matched && normalizePlate(v.plate) === matched;
                      return (
                        <li
                          key={v.plate}
                          className={`inline-flex items-center gap-2 px-3 py-1  ${
                            isMatch
                              ? "border-transparent text-gate-control-light-status-positive-text  dark:text-gate-control-dark-status-positive-text"
                              : ""
                          }`}
                        >
                          <LuCar size={18} aria-hidden="true" />
                          {formatPlate(v.plate)}
                          {(v.make || v.model) && (
                            <span className="text-sm opacity-70">
                              {[v.make, v.model].filter(Boolean).join(" ")}
                            </span>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </Field>
            </div>
          </div>
        </div>
      )}
      <div className="flex items-center gap-3 rounded-control bg-gate-control-light-status-positive-surface px-4 py-3 text-gate-control-light-status-positive-text dark:bg-gate-control-dark-status-positive-surface dark:text-gate-control-dark-status-positive-text">
        <LuShieldCheck size={24} aria-hidden="true" />
        <div>
          <p className="font-semibold">{t("gateCheck.result.grantedTitle")}</p>
          <p className="text-xs">
            {t(`gateCheck.result.recorded_${direction}`)} · {when}
          </p>
        </div>
      </div>
    </div>
  );
}
