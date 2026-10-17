// Lowercase, no accents, final sigma = sigma, so "Γιώργος", "γιωργος" and
// "ΓΙΩΡΓΟΣ" all match each other.
export const normalizeText = (value = "") =>
  value
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/ς/g, "σ");
