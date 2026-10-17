// Greek plates only use letters that exist in both alphabets, so operators
// often type them with the Latin keyboard layout (XYH 4821 instead of ΧΥΗ 4821).
// We normalise to Greek capitals. IMPORTANT: use the same canonical form that
// is stored in the database (and normalise on the server too).
const LATIN_TO_GREEK = {
  A: "Α", B: "Β", E: "Ε", Z: "Ζ", H: "Η", I: "Ι", K: "Κ",
  M: "Μ", N: "Ν", O: "Ο", P: "Ρ", T: "Τ", Y: "Υ", X: "Χ",
};

export function normalizePlate(raw = "") {
  return raw
    .toUpperCase()
    .replace(/[^\p{L}\p{N}]/gu, "")
    .replace(/[A-Z]/g, (ch) => LATIN_TO_GREEK[ch] ?? ch);
}

// "ΧΥΗ4821" -> "ΧΥΗ 4821"
export function formatPlate(plate = "") {
  return plate.replace(/^(\p{L}+)(\p{N}+)$/u, "$1 $2");
}
