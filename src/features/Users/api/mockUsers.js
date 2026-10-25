// Fake backend for the Users pages (14 users). Only loaded in development
// when VITE_USE_MOCK=true. State is in memory: a refresh resets everything.
// You are user 1 (see shared/auth/mockAuth.js).
//
// Handy triggers:
//   - delete yourself (the button is disabled, but the server also refuses)
//   - delete or demote the LAST active admin  -> "last_admin"
//   - delete user 13                          -> generic server error
//   - email of another user (e.g. gate.guard@sse.com) -> "email exists"
//   - name "FAIL" on create                   -> generic server error
import { getMockCurrentUser } from "../../../shared/auth/mockAuth";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// `daysAgo` days back at hh:mm (never in the future)
const at = (daysAgo, hours, minutes) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  date.setHours(hours, minutes, 0, 0);
  if (date.getTime() > Date.now()) date.setDate(date.getDate() - 1);
  return date.toISOString();
};

const FIRST = ["Μαρία", "Νίκος", "Ελένη", "Γιώργος", "Κατερίνα", "Δημήτρης", "Σοφία", "Παναγιώτης"];
const LAST = ["Παπαδοπούλου", "Αντωνίου", "Βασιλείου", "Οικονόμου", "Μακρή", "Λαμπράκη", "Σταυρόπουλος", "Καραγιάννης"];

const generated = Array.from({ length: 8 }, (_, i) => ({
  id: 7 + i,
  name: `${FIRST[i]} ${LAST[(i * 3 + 1) % LAST.length]}`,
  email: `operator${7 + i}@sse.com`,
  role: "operator",
  status: i % 4 === 3 ? "inactive" : "active",
  lastLoginAt: i % 5 === 2 ? null : at(i + 3, 8 + (i % 8), (i * 7) % 60),
}));

let users = [
  { id: 1, name: "Oplites Deep", email: "oplites.deep@sse.com", role: "admin", status: "active", lastLoginAt: at(0, 8, 2) },
  { id: 2, name: "Αξιωματικός Πύλης", email: "gate.guard@sse.com", role: "operator", status: "active", lastLoginAt: at(0, 7, 48) },
  { id: 3, name: "Αξιωματικός Πύλης", email: "gate.guard2@sse.com", role: "operator", status: "active", lastLoginAt: at(1, 13, 55) },
  { id: 4, name: "Deep Διευθυντής", email: "deep.manager@sse.com", role: "admin", status: "active", lastLoginAt: at(2, 9, 12) },
  { id: 5, name: "Ιωάννα Κωνσταντίνου", email: "i.konstantinou@sse.com", role: "operator", status: "inactive", lastLoginAt: at(12, 11, 20) },
  { id: 6, name: "Χρήστος Νικολάου", email: "c.nikolaou@sse.com", role: "operator", status: "active", lastLoginAt: null },
  ...generated,
];
let nextId = 15;

const httpError = (status, data = null) => {
  const error = new Error(`Mock HTTP ${status}`);
  error.status = status;
  error.data = data;
  return error;
};

const emailTaken = (email, selfId = null) =>
  users.some((u) => u.id !== selfId && u.email.toLowerCase() === email.toLowerCase());

// Active administrators left (the system must never end up with none)
const activeAdmins = () => users.filter((u) => u.role === "admin" && u.status === "active");
const isLastAdmin = (user) =>
  user.role === "admin" && user.status === "active" && activeAdmins().length <= 1;

function createUser(body) {
  if (body.name === "FAIL") throw httpError(500);
  if (emailTaken(body.email)) throw httpError(409, { code: "email_exists" });

  const user = {
    id: nextId++,
    name: body.name,
    email: body.email,
    role: body.role,
    status: "active",
    lastLoginAt: null,
  };
  users = [user, ...users];
  return user;
}

function updateUser(id, body) {
  const current = users.find((u) => u.id === id);
  if (!current) throw httpError(404);
  if (emailTaken(body.email, id)) throw httpError(409, { code: "email_exists" });

  const demoting = body.role !== current.role || body.status !== current.status;
  if (demoting && isLastAdmin(current)) throw httpError(409, { code: "last_admin" });

  const updated = {
    ...current,
    name: body.name,
    email: body.email,
    role: body.role,
    status: body.status,
  };
  users = users.map((u) => (u.id === id ? updated : u));
  return updated; // a new password (body.password) would be hashed and stored here
}

function deleteUser(id) {
  const user = users.find((u) => u.id === id);
  if (!user) throw httpError(404);
  if (id === getMockCurrentUser().id) throw httpError(403, { code: "cannot_delete_self" });
  if (id === 13) throw httpError(500);
  if (isLastAdmin(user)) throw httpError(409, { code: "last_admin" });

  users = users.filter((u) => u.id !== id);
}

export async function mockUsersRequest(path = "", options = {}) {
  const method = options.method ?? "GET";
  const body = options.body ? JSON.parse(options.body) : null;

  if (method === "GET" && path === "") {
    await delay(600);
    return users.map((u) => ({ ...u }));
  }

  if (method === "POST" && path === "") {
    await delay(800);
    return createUser(body);
  }

  const match = path.match(/^\/(\d+)$/);
  if (match) {
    const id = Number(match[1]);

    if (method === "GET") {
      await delay(500);
      const user = users.find((u) => u.id === id);
      if (!user) throw httpError(404);
      return { ...user };
    }
    if (method === "PUT") {
      await delay(800);
      return updateUser(id, body);
    }
    if (method === "DELETE") {
      await delay(600);
      deleteUser(id);
      return null;
    }
  }

  throw new Error(`Mock: unknown route ${method} ${path}`);
}
