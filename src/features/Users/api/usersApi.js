import { normalizeText } from "../../ViewPersonnel/utils/text";

// All backend calls for the Users pages. If the Express routes or JSON differ
// from the ones below, this is the only file you need to change.
const BASE = "/api/users";
const USE_MOCK = true;
// import.meta.env.DEV && import.meta.env.VITE_USE_MOCK === "true";

async function request(path = "", options = {}) {
  if (USE_MOCK) {
    const { mockUsersRequest } = await import("./mockUsers");
    return mockUsersRequest(path, options);
  }

  const res = await fetch(`${BASE}${path}`, {
    credentials: "include",
    ...options,
    headers: { "Content-Type": "application/json", ...options.headers },
  });

  if (!res.ok) {
    const error = new Error(`Request failed: ${res.status}`);
    error.status = res.status;
    error.data = await res.json().catch(() => null); // e.g. { code: "email_exists" }
    throw error;
  }
  return res.status === 204 ? null : res.json();
}

// Accepts both camelCase and the snake_case rows Postgres returns
const pick = (obj, camel, snake) => obj?.[camel] ?? obj?.[snake];

function mapUser(u) {
  const name = u.name ?? u.full_name ?? "";
  const email = u.email ?? "";

  return {
    id: u.id,
    name,
    email,
    role: u.role, // "admin" | "operator"
    status: u.status ?? (u.is_active === false ? "inactive" : "active"),
    lastLoginAt: pick(u, "lastLoginAt", "last_login_at") ?? null,
    // Precomputed once per fetch, used by the search filter
    searchKey: normalizeText(`${name} ${email}`),
  };
}

export const usersApi = {
  // GET /api/users -> [{ id, name, email, role, status, lastLoginAt }]
  async getAll() {
    const data = await request();
    return Array.isArray(data) ? data.map(mapUser) : [];
  },

  // GET /api/users/:id -> one user (404 if missing)
  async getById(id) {
    return mapUser(await request(`/${id}`));
  },

  // POST /api/users  { name, email, role, password }
  // -> 201 + user | 409 { code: "email_exists" }
  create(payload) {
    return request("", { method: "POST", body: JSON.stringify(payload) });
  },

  // PUT /api/users/:id  { name, email, role, status, password? }
  // `password` only when an admin sets a new one.
  // -> 200 + user | 404 | 409 { code: "email_exists" } | 409 { code: "last_admin" }
  update(id, payload) {
    return request(`/${id}`, { method: "PUT", body: JSON.stringify(payload) });
  },

  // DELETE /api/users/:id -> 204
  // -> 403 { code: "cannot_delete_self" } | 409 { code: "last_admin" }
  remove(id) {
    return request(`/${id}`, { method: "DELETE" });
  },
};
