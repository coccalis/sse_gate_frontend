import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { canGeneratePassword, generatePassword } from "../utils/generatePassword";
import { validateUser } from "../utils/validateUser";

export const EMPTY_USER_VALUES = {
  name: "",
  email: "",
  role: "operator",
  status: "active",
  password: "",
};

// Form state and behaviour for the create and edit pages.
//   mode             "create" | "edit"
//   initialValues    read ONCE at mount (a background refetch never wipes edits)
//   onSubmit(payload) must return a promise. If it rejects, 409 codes are mapped
//                    to the right message, anything else shows a general error.
export function useUserForm({ mode, initialValues, onSubmit, isSubmitting = false }) {
  const { t } = useTranslation();
  const formRef = useRef(null);

  const [values, setValues] = useState(() => initialValues ?? EMPTY_USER_VALUES);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState(null);
  const [focusTick, setFocusTick] = useState(0);
  const [copied, setCopied] = useState(false);

  // After a failed submit, focus the first invalid field
  useEffect(() => {
    if (focusTick === 0) return;
    formRef.current?.querySelector('[aria-invalid="true"]')?.focus();
  }, [focusTick]);

  // "Copied" disappears after 2 seconds
  useEffect(() => {
    if (!copied) return undefined;
    const id = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(id);
  }, [copied]);

  const setField = useCallback((name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev));
    if (name === "password") setCopied(false);
  }, []);

  const generate = useCallback(() => {
    setField("password", generatePassword());
  }, [setField]);

  const canCopy = Boolean(globalThis.navigator?.clipboard?.writeText);
  const copyPassword = async () => {
    try {
      await navigator.clipboard.writeText(values.password);
      setCopied(true);
    } catch {
      // clipboard blocked: the admin can still select the text by hand
    }
  };

  const error = (name) =>
    errors[name] ? t(`usersPage.form.errors.${errors[name]}`) : undefined;

  const submit = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;
    setSubmitError(null);

    const found = validateUser(values, mode);
    if (Object.keys(found).length > 0) {
      setErrors(found);
      setFocusTick((n) => n + 1);
      return;
    }
    setErrors({});

    const payload = {
      name: values.name.trim(),
      email: values.email.trim().toLowerCase(),
      role: values.role,
      ...(mode === "edit" && { status: values.status }),
      ...(values.password && { password: values.password }),
    };

    try {
      await onSubmit(payload);
    } catch (err) {
      const code = err?.status === 409 ? err.data?.code : null;

      if (code === "email_exists") {
        setErrors({ email: "emailExists" });
        setFocusTick((n) => n + 1);
      } else if (code === "last_admin") {
        setSubmitError("lastAdmin");
      } else {
        setSubmitError("submitFailed");
      }
    }
  };

  return {
    formRef,
    values,
    setField,
    error,
    submit,
    submitError,
    generate,
    canGenerate: canGeneratePassword(),
    canCopy,
    copyPassword,
    copied,
    isSubmitting,
  };
}
