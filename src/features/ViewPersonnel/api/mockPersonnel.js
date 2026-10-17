// Fake backend for the View Personnel page (248 people, 86 inside).
// Only loaded in development when VITE_USE_MOCK=true. State is in memory:
// a page refresh brings deleted people back.

const FAIL_LOAD = false; // set to true to test the "could not load" state

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const avatar = (color) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect width="200" height="200" fill="${color}"/><circle cx="100" cy="80" r="38" fill="#fff" fill-opacity=".8"/><rect x="40" y="130" width="120" height="70" rx="35" fill="#fff" fill-opacity=".8"/></svg>`
  )}`;

const MALE = ["Γιώργος", "Νίκος", "Δημήτρης", "Κώστας", "Αλέξανδρος", "Παναγιώτης", "Χρήστος", "Θοδωρής", "Μιχάλης", "Στέλιος", "Βασίλης", "Ανδρέας"];
const FEMALE = ["Μαρία", "Ελένη", "Κατερίνα", "Σοφία", "Αναστασία", "Δήμητρα", "Ιωάννα", "Χριστίνα", "Αθηνά", "Βασιλική", "Ευαγγελία", "Αγγελική"];
const SURNAMES = [
  ["Δημητρίου", "Δημητρίου"], ["Παπαδόπουλος", "Παπαδοπούλου"],
  ["Κωνσταντίνου", "Κωνσταντίνου"], ["Ιωάννου", "Ιωάννου"],
  ["Νικολάου", "Νικολάου"], ["Γεωργίου", "Γεωργίου"],
  ["Αντωνίου", "Αντωνίου"], ["Βασιλείου", "Βασιλείου"],
  ["Παπαγεωργίου", "Παπαγεωργίου"], ["Οικονόμου", "Οικονόμου"],
  ["Καραγιάννης", "Καραγιάννη"], ["Μακρής", "Μακρή"],
  ["Αναγνώστου", "Αναγνώστου"], ["Σταυρόπουλος", "Σταυροπούλου"],
  ["Μαυρίδης", "Μαυρίδη"], ["Λαμπράκης", "Λαμπράκη"],
];
const RANKS = ["Ανθυπολοχαγός", "Υπολοχαγός", "Λοχαγός", "Ταγματάρχης", "Αντισυνταγματάρχης", "Συνταγματάρχης", "Λοχίας", "Επιλοχίας"];
const UNITS = ["ΣΣΕ/ΕΠΙΤΕΛΕΙΟ", "ΚΕΤΑΚ", "ΣΣΕ/ΣΕ", "ΣΣΕ/ΛΔ", "ΣΣΕ/ΤΕΠ"];
const CARS = [["Toyota", "Yaris"], ["Seat", "Ibiza"], ["Fiat", "Panda"], ["Opel", "Corsa"], ["Hyundai", "i20"], ["Yamaha", "T-Max"]];
const LETTERS = ["Α", "Β", "Ε", "Ζ", "Η", "Ι", "Κ", "Μ", "Ν", "Ο", "Ρ", "Τ", "Υ", "Χ"];
const COLORS = ["#99bc85", "#c9b79c", "#8fa8b8", "#b79ca8"];

const COUNT = 248;

const plate = (i, k) =>
  `${LETTERS[(i * 3 + k) % 14]}${LETTERS[(i * 5 + 1 + k) % 14]}${LETTERS[(i * 7 + 2) % 14]}${
    1000 + ((i * 397 + k * 1111) % 9000)
  }`;

function makePerson(i) {
  const female = i % 2 === 1;
  const vehicleCount = i % 9 === 4 ? 0 : i % 7 === 3 ? 2 : 1; // some have none, some two

  return {
    id: i + 1,
    firstName: (female ? FEMALE : MALE)[(i * 5) % 12],
    lastName: SURNAMES[(i * 7 + 3) % SURNAMES.length][female ? 1 : 0],
    rank: RANKS[(i * 3) % RANKS.length],
    unit: UNITS[(i * 11) % UNITS.length],
    cardId: `GC-${String(4821 + i * 13).padStart(6, "0")}`,
    photoUrl: i % 11 === 0 ? avatar(COLORS[i % COLORS.length]) : null,
    // 37 is coprime with 248, so exactly 86 of the 248 people are inside
    status: (i * 37) % COUNT < 86 ? "inside" : "outside",
    vehicles: Array.from({ length: vehicleCount }, (_, k) => {
      const [make, model] = CARS[(i + k) % CARS.length];
      return { plate: plate(i, k), make, model };
    }),
  };
}

let people = Array.from({ length: COUNT }, (_, i) => makePerson(i));

export async function mockPersonnelRequest(path = "", options = {}) {
  const method = options.method ?? "GET";

  if (method === "GET" && path === "") {
    await delay(700);
    if (FAIL_LOAD) throw new Error("Mock: load failed");
    return people.map((p) => ({ ...p }));
  }

  const match = path.match(/^\/(\d+)$/);
  if (method === "DELETE" && match) {
    await delay(600);
    const id = Number(match[1]);
    if (id === 7) throw new Error("Mock: cannot delete this person"); // error state
    people = people.filter((p) => p.id !== id);
    return null;
  }

  throw new Error(`Mock: unknown route ${method} ${path}`);
}
