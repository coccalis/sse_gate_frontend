// Fake backend for testing the Check Credentials page without Express.
// Only loaded in development when VITE_USE_MOCK=true (see gateApi.js).
// State lives in memory: refreshing the page resets it.

const delay = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));

// Inline SVG, so the photo case can be tested without internet
const avatar = (color) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect width="200" height="200" fill="${color}"/><circle cx="100" cy="80" r="38" fill="#fff" fill-opacity=".8"/><rect x="40" y="130" width="120" height="70" rx="35" fill="#fff" fill-opacity=".8"/></svg>`,
  )}`;

const PEOPLE = [
  {
    id: 1,
    firstName: "Γιώργος",
    lastName: "Δημητρίου",
    rank: "Λοχαγός",
    unit: "1ο Τάγμα",
    cardId: "1001",
    status: "active",
    photoUrl: avatar("#99bc85"), // has a photo
    vehicles: [{ plate: "ΧΥΗ4821", make: "Toyota", model: "Yaris" }],
  },
  {
    id: 2,
    firstName: "Μαρία",
    lastName: "Κωνσταντίνου",
    rank: "Υπολοχαγός",
    unit: "Λόχος Διοίκησης",
    cardId: "1002",
    status: "active",
    photoUrl: null, // initials fallback
    vehicles: [
      { plate: "ΙΚΑ1234", make: "Seat", model: "Ibiza" },
      { plate: "ΜΝΒ5567", make: "Yamaha", model: "T-Max" },
    ],
  },
  {
    id: 3,
    firstName: "Ελένη",
    lastName: "Παπαγεωργίου",
    rank: "Ανθυπολοχαγός",
    unit: "2ο Τάγμα",
    cardId: "1003",
    status: "active",
    photoUrl: "https://example.invalid/broken.jpg", // broken photo -> initials fallback
    vehicles: [], // no vehicles
  },
  {
    id: 4,
    firstName: "Νίκος",
    lastName: "Αντωνίου",
    rank: "Λοχίας",
    unit: "3ο Τάγμα",
    cardId: "2001",
    status: "inactive", // -> denied: inactive
    photoUrl: null,
    vehicles: [{ plate: "ΖΖΚ9090", make: "Fiat", model: "Panda" }],
  },
  {
    id: 5,
    firstName: "Δημήτρης",
    lastName: "Βασιλείου",
    rank: "Επιλοχίας",
    unit: "Λόχος Υποστήριξης",
    cardId: "2002",
    status: "expired", // -> denied: expired
    photoUrl: null,
    vehicles: [],
  },
];

// Who is currently inside (Μαρία starts inside, so entry is denied for her)
const inside = new Set(["1002"]);

const minutesAgo = (m) => new Date(Date.now() - m * 60_000).toISOString();
let logId = 3;
const log = [
  { id: 3, name: "Γιώργος Δημητρίου", direction: "entry", time: minutesAgo(5) },
  {
    id: 2,
    name: "Μαρία Κωνσταντίνου",
    direction: "exit",
    time: minutesAgo(11),
  },
  {
    id: 1,
    name: "Ελένη Παπαγεωργίου",
    direction: "entry",
    time: minutesAgo(19),
  },
];

const fullName = (p) => `${p.firstName} ${p.lastName}`;

function evaluate(person, direction) {
  if (person.status !== "active") {
    return { valid: false, reason: person.status, person };
  }

  const isInside = inside.has(person.cardId);
  if (direction === "entry" && isInside) {
    return { valid: false, reason: "already_inside", person };
  }
  if (direction === "exit" && !isInside) {
    return { valid: false, reason: "already_outside", person };
  }

  if (direction === "entry") inside.add(person.cardId);
  else inside.delete(person.cardId);

  log.unshift({
    id: ++logId,
    name: fullName(person),
    direction,
    time: new Date().toISOString(),
  });

  return { valid: true, person, checkedAt: new Date().toISOString() };
}

// Same shape as the real `request()` in gateApi.js
export async function mockRequest(path, options = {}) {
  await delay();
  const body = options.body ? JSON.parse(options.body) : {};
  const [route, query = ""] = path.split("?");

  if (route === "/scan") {
    if (body.cardId === "9999") throw new Error("Mock server error"); // error state
    const person = PEOPLE.find((p) => p.cardId === body.cardId);
    if (!person) return { valid: false, reason: "not_found" };
    return evaluate(person, body.direction);
  }

  if (route === "/check-plate") {
    if (body.plate === "ΕΕΕ0000") throw new Error("Mock server error"); // error state
    const person = PEOPLE.find((p) =>
      p.vehicles.some((v) => v.plate === body.plate),
    );
    if (!person) return { valid: false, reason: "not_found" };
    return { ...evaluate(person, body.direction), matchedPlate: body.plate };
  }

  if (route === "/status") {
    return {
      readerConnected: true,
      inside: 80 + inside.size,
      outside: 168 - inside.size,
    };
  }

  if (route === "/recent-scans") {
    const limit = Number(new URLSearchParams(query).get("limit")) || 3;
    return log.slice(0, limit);
  }

  throw new Error(`Mock: unknown route ${path}`);
}
