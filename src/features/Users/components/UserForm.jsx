import { useTranslation } from "react-i18next";
import {
  LuCheck,
  LuCopy,
  LuKeyRound,
  LuMail,
  LuRefreshCw,
} from "react-icons/lu";
import GlassCard from "../../../shared/components/ui/GlassCard";
import Button from "../../../shared/components/ui/Button";
import Textfield from "../../../shared/components/ui/Textfield";
import FormSection from "../../PersonnelForm/components/FormSection";
import RoleSelector from "./RoleSelector";
import { useUserForm } from "../hooks/useUserForm";

const MUTED =
  "text-gate-control-light-text-secondary dark:text-gate-control-dark-text-secondary";

// Shared by the Create and Edit pages.
//   mode          "create" | "edit"
//   isSelf        editing your own account: role and status are locked
//   submitLabel   text of the submit button
//   onSubmit      async (payload) => ...  (reject to show an error)
export default function UserForm({
  mode = "create",
  initialValues,
  isSelf = false,
  submitLabel,
  onSubmit,
  onCancel,
  isSubmitting = false,
}) {
  const { t } = useTranslation();
  const form = useUserForm({ mode, initialValues, onSubmit, isSubmitting });
  const { values, setField, error } = form;
  const isEdit = mode === "edit";

  return (
    <form
      ref={form.formRef}
      onSubmit={form.submit}
      noValidate
      className="space-y-6"
    >
      <GlassCard padded={false} className="space-y-8 p-6 sm:p-8">
        <FormSection
          title={t("usersPage.form.account.title")}
          description={t("usersPage.form.account.description")}
        >
          <div className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
            <Textfield
              title={t("usersPage.form.fields.name.label")}
              type="text"
              name="name"
              placeholder={t("usersPage.form.fields.name.placeholder")}
              autoComplete="off"
              value={values.name}
              onChange={(e) => setField("name", e.target.value)}
              error={error("name")}
              className="py-3"
            />
            <Textfield
              title={t("usersPage.form.fields.email.label")}
              type="text"
              name="email"
              icon={LuMail}
              inputMode="email"
              autoComplete="off"
              placeholder={t("usersPage.form.fields.email.placeholder")}
              value={values.email}
              onChange={(e) => setField("email", e.target.value)}
              error={error("email")}
              className="py-3"
            />
          </div>

          {/* The password is shown in plain text on purpose: it is a temporary
              one that the admin has to read out or copy to the user. */}
          <div className="space-y-2">
            <div className="flex items-start gap-3">
              <div className="min-w-0 flex-1">
                <Textfield
                  title={t(
                    isEdit
                      ? "usersPage.form.fields.password.editLabel"
                      : "usersPage.form.fields.password.label",
                  )}
                  type="text"
                  name="password"
                  icon={LuKeyRound}
                  autoComplete="new-password"
                  placeholder={t("usersPage.form.fields.password.placeholder")}
                  value={values.password}
                  onChange={(e) => setField("password", e.target.value)}
                  error={error("password")}
                  className="py-3 font-mono"
                />
              </div>

              {/* mt-[1.625rem] = height of the label above the input */}
              {form.canGenerate && (
                <Button
                  type="button"
                  variant="secondary"
                  onClick={form.generate}
                  className="mt-[1.625rem] h-[46px] shrink-0 px-4"
                >
                  <LuRefreshCw size={16} aria-hidden="true" />
                  {t("usersPage.form.fields.password.generate")}
                </Button>
              )}
              {form.canCopy && (
                <Button
                  type="button"
                  variant="secondary"
                  onClick={form.copyPassword}
                  disabled={!values.password}
                  className="mt-[1.625rem] h-[46px] shrink-0 px-4"
                >
                  {form.copied ? (
                    <LuCheck size={16} aria-hidden="true" />
                  ) : (
                    <LuCopy size={16} aria-hidden="true" />
                  )}
                  {t(
                    form.copied
                      ? "usersPage.form.fields.password.copied"
                      : "usersPage.form.fields.password.copy",
                  )}
                </Button>
              )}
            </div>
            <p className={`text-xs ${MUTED}`}>
              {t(
                isEdit
                  ? "usersPage.form.fields.password.hintEdit"
                  : "usersPage.form.fields.password.hintCreate",
              )}
            </p>
          </div>
        </FormSection>

        <hr className="border-gate-control-light-border-subtle dark:border-gate-control-dark-border-subtle" />

        <FormSection
          title={t("usersPage.form.access.title")}
          description={t("usersPage.form.access.description")}
        >
          <RoleSelector
            value={values.role}
            onChange={(role) => setField("role", role)}
            disabled={isSelf}
          />

          {isEdit && (
            <label
              className={`flex items-start justify-between gap-4 rounded-control border border-gate-control-light-border-subtle bg-gate-control-light-surface-input p-5 dark:border-gate-control-dark-border-subtle dark:bg-gate-control-dark-surface-input ${
                isSelf ? "cursor-not-allowed opacity-60" : "cursor-pointer"
              }`}
            >
              <span className="space-y-1">
                <span className="block text-sm font-semibold text-gate-control-light-text-primary dark:text-gate-control-dark-text-primary">
                  {t("usersPage.form.fields.status.label")}
                </span>
                <span className={`block text-xs leading-5 ${MUTED}`}>
                  {t("usersPage.form.fields.status.description")}
                </span>
              </span>

              <input
                type="checkbox"
                role="switch"
                checked={values.status === "active"}
                disabled={isSelf}
                onChange={(e) =>
                  setField("status", e.target.checked ? "active" : "inactive")
                }
                className="peer sr-only"
              />
              <span
                aria-hidden="true"
                className="relative mt-0.5 h-6 w-11 shrink-0 rounded-full border border-gate-control-light-border-subtle bg-gate-control-light-status-neutral-surface transition-colors after:absolute after:left-0.5 after:top-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white after:shadow after:transition-transform after:content-[''] peer-checked:bg-gate-control-light-accent-primary peer-checked:after:translate-x-5 peer-focus-visible:ring-2 peer-focus-visible:ring-gate-control-light-accent-primary dark:border-gate-control-dark-border-subtle dark:bg-gate-control-dark-status-neutral-surface dark:peer-checked:bg-gate-control-dark-accent-primary dark:peer-focus-visible:ring-gate-control-dark-accent-primary"
              />
            </label>
          )}

          {isSelf && (
            <p className={`text-xs ${MUTED}`}>{t("usersPage.form.selfNote")}</p>
          )}
        </FormSection>
      </GlassCard>

      {form.submitError && (
        <p
          role="alert"
          className="rounded-control bg-gate-control-light-status-danger-surface px-4 py-3 text-sm text-gate-control-light-status-danger-text dark:bg-gate-control-dark-status-danger-surface dark:text-gate-control-dark-status-danger-text"
        >
          {t(`usersPage.form.errors.${form.submitError}`)}
        </p>
      )}

      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          {t("usersPage.form.actions.cancel")}
        </Button>
        <Button type="submit" loading={isSubmitting}>
          <LuCheck size={18} aria-hidden="true" />
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
