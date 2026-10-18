// Fake backend for the personnel pages (248 people, 86 inside).
// Only loaded in development when VITE_USE_MOCK=true. State is in memory:
// a page refresh resets everything.
//
// Handy triggers:
//   - open /personnel/9999/edit            -> "not found" state
//   - delete the person with id 7          -> delete error
//   - card number "FAIL" on add/edit       -> server error
//   - card number of ANOTHER person (e.g. GC-004821) -> "card exists"
//   - plate of ANOTHER person's vehicle (e.g. ABE 1000) -> "plate exists"

const FAIL_LOAD = false; // set to true to test the list "could not load" state

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const avatar = (color) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect width="200" height="200" fill="${color}"/><circle cx="100" cy="80" r="38" fill="#fff" fill-opacity=".8"/><rect x="40" y="130" width="120" height="70" rx="35" fill="#fff" fill-opacity=".8"/></svg>`,
  )}`;

const MALE = [
  "Γιώργος",
  "Νίκος",
  "Δημήτρης",
  "Κώστας",
  "Αλέξανδρος",
  "Παναγιώτης",
  "Χρήστος",
  "Θοδωρής",
  "Μιχάλης",
  "Στέλιος",
  "Βασίλης",
  "Ανδρέας",
];
const FEMALE = [
  "Μαρία",
  "Ελένη",
  "Κατερίνα",
  "Σοφία",
  "Αναστασία",
  "Δήμητρα",
  "Ιωάννα",
  "Χριστίνα",
  "Αθηνά",
  "Βασιλική",
  "Ευαγγελία",
  "Αγγελική",
];
const SURNAMES = [
  ["Δημητρίου", "Δημητρίου"],
  ["Παπαδόπουλος", "Παπαδοπούλου"],
  ["Κωνσταντίνου", "Κωνσταντίνου"],
  ["Ιωάννου", "Ιωάννου"],
  ["Νικολάου", "Νικολάου"],
  ["Γεωργίου", "Γεωργίου"],
  ["Αντωνίου", "Αντωνίου"],
  ["Βασιλείου", "Βασιλείου"],
  ["Παπαγεωργίου", "Παπαγεωργίου"],
  ["Οικονόμου", "Οικονόμου"],
  ["Καραγιάννης", "Καραγιάννη"],
  ["Μακρής", "Μακρή"],
  ["Αναγνώστου", "Αναγνώστου"],
  ["Σταυρόπουλος", "Σταυροπούλου"],
  ["Μαυρίδης", "Μαυρίδη"],
  ["Λαμπράκης", "Λαμπράκη"],
];
const RANKS = [
  "Ανθυπολοχαγός",
  "Υπολοχαγός",
  "Λοχαγός",
  "Ταγματάρχης",
  "Αντισυνταγματάρχης",
  "Συνταγματάρχης",
  "Λοχίας",
  "Επιλοχίας",
];
const UNITS = ["ΣΣΕ/ΕΠΙΤΕΛΕΙΟ", "ΚΕΤΑΚ", "ΣΣΕ/ΣΕ", "ΣΣΕ/ΛΔ", "ΣΣΕ/ΤΕΠ"];
const CARS = [
  ["Toyota", "Yaris"],
  ["Seat", "Ibiza"],
  ["Fiat", "Panda"],
  ["Opel", "Corsa"],
  ["Hyundai", "i20"],
  ["Yamaha", "T-Max"],
];
const COLORS_KEYS = ["white", "black", "gray", "silver", "blue", "red"];
const LETTERS = [
  "Α",
  "Β",
  "Ε",
  "Ζ",
  "Η",
  "Ι",
  "Κ",
  "Μ",
  "Ν",
  "Ο",
  "Ρ",
  "Τ",
  "Υ",
  "Χ",
];
const AVATAR_COLORS = ["#99bc85", "#c9b79c", "#8fa8b8", "#b79ca8"];

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
    // Every full name is unique: i / 2 walks the first names, i / 24 moves to the next surname
    firstName: (female ? FEMALE : MALE)[Math.floor(i / 2) % 12],
    lastName:
      SURNAMES[(Math.floor(i / 24) * 5 + 3) % SURNAMES.length][female ? 1 : 0],
    rank: RANKS[(i * 3) % RANKS.length],
    unit: UNITS[(i * 11) % UNITS.length],
    cardId: `GC-${String(4821 + i * 13).padStart(6, "0")}`,
    phone: `+30 69${String(10000000 + ((i * 7919) % 90000000)).padStart(8, "0")}`,
    email: `user${i + 1}@sse.com`,
    photoUrl:
      i % 11 === 0 ? avatar(AVATAR_COLORS[i % AVATAR_COLORS.length]) : null,
    // 37 is coprime with 248, so exactly 86 of the 248 people are inside
    status: (i * 37) % COUNT < 86 ? "inside" : "outside",
    vehicles: Array.from({ length: vehicleCount }, (_, k) => {
      const [make, model] = CARS[(i + k) % CARS.length];
      return {
        plate: plate(i, k),
        type: model === "T-Max" ? "motorcycle" : "car",
        make,
        model,
        color: COLORS_KEYS[(i + k) % COLORS_KEYS.length],
      };
    }),
  };
}

let people = Array.from({ length: COUNT }, (_, i) => makePerson(i));

const httpError = (status, data = null) => {
  const error = new Error(`Mock HTTP ${status}`);
  error.status = status;
  error.data = data;
  return error;
};

// Shared by create and update. `selfId` is ignored in the duplicate checks.
function checkDuplicates(data, selfId = null) {
  if (data.cardId.toUpperCase() === "FAIL") throw httpError(500);

  if (people.some((p) => p.id !== selfId && p.cardId === data.cardId)) {
    throw httpError(409, { code: "card_exists" });
  }
  for (const vehicle of data.vehicles) {
    const taken = people.some(
      (p) =>
        p.id !== selfId && p.vehicles.some((v) => v.plate === vehicle.plate),
    );
    if (taken)
      throw httpError(409, { code: "plate_exists", plate: vehicle.plate });
  }
}

function createPerson(formData) {
  const data = JSON.parse(formData.get("data"));
  const photo = formData.get("photo");
  checkDuplicates(data);

  const person = {
    id: Math.max(0, ...people.map((p) => p.id)) + 1,
    firstName: data.firstName,
    lastName: data.lastName,
    rank: data.rank,
    unit: data.unit,
    cardId: data.cardId,
    phone: data.phone,
    email: data.email,
    photoUrl: photo instanceof File ? URL.createObjectURL(photo) : null,
    status: "outside",
    vehicles: data.vehicles,
  };
  people = [person, ...people]; // first in the list, so it is easy to spot
  return person;
}

function updatePerson(id, formData) {
  const data = JSON.parse(formData.get("data"));
  const photo = formData.get("photo");

  const current = people.find((p) => p.id === id);
  if (!current) throw httpError(404);
  checkDuplicates(data, id);

  let photoUrl = current.photoUrl;
  if (photo instanceof File) photoUrl = URL.createObjectURL(photo);
  else if (data.removePhoto) photoUrl = null;

  const updated = {
    ...current,
    firstName: data.firstName,
    lastName: data.lastName,
    rank: data.rank,
    unit: data.unit,
    cardId: data.cardId,
    phone: data.phone,
    email: data.email,
    photoUrl,
    vehicles: data.vehicles,
  };
  people = people.map((p) => (p.id === id ? updated : p));
  return updated;
}

export async function mockPersonnelRequest(path = "", options = {}) {
  const method = options.method ?? "GET";

  if (method === "GET" && path === "") {
    await delay(700);
    if (FAIL_LOAD) throw new Error("Mock: load failed");
    return people.map((p) => ({ ...p }));
  }

  if (method === "GET" && path === "/options") {
    await delay(400);
    return { ranks: RANKS, units: UNITS };
  }

  if (method === "POST" && path === "") {
    await delay(900);
    return createPerson(options.body);
  }

  const match = path.match(/^\/(\d+)$/);
  if (match) {
    const id = Number(match[1]);

    if (method === "GET") {
      await delay(600);
      const person = people.find((p) => p.id === id);
      if (!person) throw httpError(404);
      return { ...person };
    }

    if (method === "PUT") {
      await delay(900);
      return updatePerson(id, options.body);
    }

    if (method === "DELETE") {
      await delay(600);
      if (id === 7) throw new Error("Mock: cannot delete this person"); // error state
      people = people.filter((p) => p.id !== id);
      return null;
    }
  }

  throw new Error(`Mock: unknown route ${method} ${path}`);
}
