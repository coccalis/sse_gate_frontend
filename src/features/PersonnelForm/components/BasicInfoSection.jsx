import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { LuCreditCard, LuMail, LuPhone } from "react-icons/lu";
import Textfield from "../../../shared/components/ui/Textfield";
import Select from "../../../shared/components/ui/Select";
import FormSection from "./FormSection";
import PhotoUpload from "./PhotoUpload";
import { usePersonnelFormContext } from "../context/PersonnelFormContext";
import { usePersonnelOptions } from "../hooks/usePersonnelOptions";

const toOptions = (list = []) => list.map((value) => ({ value, label: value }));

export default function BasicInfoSection() {
  const { t } = useTranslation();
  const { values, setField, error } = usePersonnelFormContext();
  const { data, isPending, isError, refetch } = usePersonnelOptions();

  const rankOptions = useMemo(() => toOptions(data?.ranks), [data]);
  const unitOptions = useMemo(() => toOptions(data?.units), [data]);

  const onText = (name) => (e) => setField(name, e.target.value);

  return (
    <FormSection
      title={t("personnelForm.basic.title")}
      description={t("personnelForm.basic.description")}
    >
      <PhotoUpload />

      {isError && (
        <div
          role="alert"
          className="flex flex-wrap items-center justify-between gap-3 rounded-control bg-gate-control-light-surface-warning px-4 py-3 text-sm text-gate-control-light-status-warning-text dark:bg-gate-control-dark-surface-warning dark:text-gate-control-dark-status-warning-text"
        >
          {t("personnelForm.errors.optionsFailed")}
          <button
            type="button"
            onClick={() => refetch()}
            className="font-semibold underline focus:outline-none focus-visible:ring-2"
          >
            {t("personnelForm.errors.retry")}
          </button>
        </div>
      )}

      <div className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
        <Textfield
          title={t("personnelForm.fields.firstName.label")}
          type="text"
          name="firstName"
          placeholder={t("personnelForm.fields.firstName.placeholder")}
          autoComplete="given-name"
          value={values.firstName}
          onChange={onText("firstName")}
          error={error("firstName")}
          className="py-3"
        />
        <Textfield
          title={t("personnelForm.fields.lastName.label")}
          type="text"
          name="lastName"
          placeholder={t("personnelForm.fields.lastName.placeholder")}
          autoComplete="family-name"
          value={values.lastName}
          onChange={onText("lastName")}
          error={error("lastName")}
          className="py-3"
        />

        <Select
          title={t("personnelForm.fields.rank.label")}
          name="rank"
          placeholder={t("personnelForm.fields.rank.placeholder")}
          options={rankOptions}
          value={values.rank}
          onChange={onText("rank")}
          disabled={isPending || isError}
          error={error("rank")}
        />
        <Select
          title={t("personnelForm.fields.unit.label")}
          name="unit"
          placeholder={t("personnelForm.fields.unit.placeholder")}
          options={unitOptions}
          value={values.unit}
          onChange={onText("unit")}
          disabled={isPending || isError}
          error={error("unit")}
        />

        <Textfield
          title={t("personnelForm.fields.cardId.label")}
          type="text"
          name="cardId"
          icon={LuCreditCard}
          placeholder={t("personnelForm.fields.cardId.placeholder")}
          autoComplete="off"
          value={values.cardId}
          onChange={onText("cardId")}
          error={error("cardId")}
          className="py-3"
        />
        <Textfield
          title={t("personnelForm.fields.phone.label")}
          type="text"
          name="phone"
          icon={LuPhone}
          inputMode="tel"
          autoComplete="tel"
          placeholder={t("personnelForm.fields.phone.placeholder")}
          value={values.phone}
          onChange={onText("phone")}
          error={error("phone")}
          className="py-3"
        />

        <div className="sm:col-span-2">
          <Textfield
            title={t("personnelForm.fields.email.label")}
            type="text"
            name="email"
            icon={LuMail}
            inputMode="email"
            autoComplete="email"
            placeholder={t("personnelForm.fields.email.placeholder")}
            value={values.email}
            onChange={onText("email")}
            error={error("email")}
            className="py-3"
          />
        </div>
      </div>
    </FormSection>
  );
}
