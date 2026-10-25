// Random password from the browser's secure generator. Looks-alike characters
// (0 O 1 l I) are left out so it can be read out or typed without mistakes.
const LOWER = "abcdefghijkmnopqrstuvwxyz";
const UPPER = "ABCDEFGHJKLMNPQRSTUVWXYZ";
const DIGITS = "23456789";
const ALPHABET = LOWER + UPPER + DIGITS;

// Secure random numbers only exist on HTTPS and localhost
export const canGeneratePassword = () =>
  typeof globalThis.crypto?.getRandomValues === "function";

function randomIndex(max) {
  const limit = 256 - (256 % max); // drop values that would favour small indexes
  const buffer = new Uint8Array(1);
  let value;
  do {
    globalThis.crypto.getRandomValues(buffer);
    value = buffer[0];
  } while (value >= limit);
  return value % max;
}

export function generatePassword(length = 12) {
  if (!canGeneratePassword()) {
    throw new Error("Secure random numbers are not available");
  }

  let password;
  do {
    password = Array.from(
      { length },
      () => ALPHABET[randomIndex(ALPHABET.length)]
    ).join("");
  } while (!/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/[2-9]/.test(password));

  return password;
}
