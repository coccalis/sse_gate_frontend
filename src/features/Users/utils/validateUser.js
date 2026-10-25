const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const MIN_PASSWORD_LENGTH = 8;

// Returns translation CODES (not texts), so they re-translate with the language.
// mode "create": password required. mode "edit": password optional.
export function validateUser(values, mode) {
  const errors = {};

  if (!values.name.trim()) errors.name = "required";

  const email = values.email.trim();
  if (!email) errors.email = "required";
  else if (!EMAIL.test(email)) errors.email = "invalidEmail";

  if (mode === "create" && !values.password) errors.password = "required";
  else if (values.password && values.password.length < MIN_PASSWORD_LENGTH) {
    errors.password = "passwordShort";
  }

  return errors;
}
