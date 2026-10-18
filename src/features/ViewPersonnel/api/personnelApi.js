import { normalizeText } from "../utils/text";
import { normalizePlate } from "../../CheckCredentials/utils/plate";

// All backend calls for the personnel pages. If the Express routes or JSON
// differ from the ones below, this is the only file you need to change.
const BASE = "/api/personnel";
const USE_MOCK = true;
// import.meta.env.DEV && import.meta.env.VITE_USE_MOCK === "true";

async function request(path = "", options = {}) {
  if (USE_MOCK) {
    const { mockPersonnelRequest } = await import("./mockPersonnel");
    return mockPersonnelRequest(path, options);
  }

  // With FormData the browser sets the Content-Type (and the boundary) itself
  const isForm = options.body instanceof FormData;
  const res = await fetch(`${BASE}${path}`, {
    credentials: "include",
    ...options,
    headers: isForm
      ? options.headers
      : { "Content-Type": "application/json", ...options.headers },
  });

  if (!res.ok) {
    const error = new Error(`Request failed: ${res.status}`);
    error.status = res.status;
    error.data = await res.json().catch(() => null); // e.g. { code: "card_exists" }
    throw error;
  }
  return res.status === 204 ? null : res.json();
}

// Accepts both camelCase and the snake_case rows Postgres returns
const pick = (obj, camel, snake) => obj?.[camel] ?? obj?.[snake];

function mapPerson(p) {
  const firstName = pick(p, "firstName", "first_name") ?? "";
  const lastName = pick(p, "lastName", "last_name") ?? "";
  const cardId = pick(p, "cardId", "card_id") ?? "";
  const vehicles = (p.vehicles ?? []).map((v) => ({
    plate: v.plate,
    type: v.type,
    make: v.make,
    model: v.model,
    color: v.color,
  }));

  return {
    id: p.id,
    firstName,
    lastName,
    fullName: `${firstName} ${lastName}`.trim(),
    cardId,
    rank: p.rank ?? "",
    unit: p.unit ?? "",
    phone: p.phone ?? "",
    email: p.email ?? "",
    photoUrl: pick(p, "photoUrl", "photo_url") ?? null,
    status:
      p.status ?? (pick(p, "isInside", "is_inside") ? "inside" : "outside"),
    vehicles,
    // Precomputed once per fetch, used by the search filter
    searchKey: normalizeText(
      `${firstName} ${lastName} ${lastName} ${firstName} ${cardId}`,
    ),
    plateKeys: vehicles.map((v) => normalizePlate(v.plate)),
  };
}

export const personnelApi = {
  // GET /api/personnel -> [{ id, firstName, lastName, rank, unit, cardId,
  //                          photoUrl, status: "inside" | "outside",
  //                          vehicles: [{ plate, type, make, model, color }] }]
  async getAll() {
    const data = await request();
    return Array.isArray(data) ? data.map(mapPerson) : [];
  },

  // GET /api/personnel/:id -> one person with everything (phone, email, vehicles)
  // -> 404 when it does not exist
  async getById(id) {
    return mapPerson(await request(`/${id}`));
  },

  // GET /api/personnel/options -> { ranks: string[], units: string[] }
  async getOptions() {
    const data = await request("/options");
    return { ranks: data?.ranks ?? [], units: data?.units ?? [] };
  },

  // POST /api/personnel   multipart/form-data
  //   data  = JSON string { firstName, lastName, rank, unit, cardId, phone,
  //                         email, vehicles: [{ type, plate, make, model, color }] }
  //   photo = optional file (JPG/PNG, max 5 MB)
  // -> 201 + the created person
  // -> 409 { code: "card_exists" } | { code: "plate_exists", plate }
  create({ photo, removePhoto, ...data }) {
    const body = new FormData();
    body.append("data", JSON.stringify(data));
    if (photo) body.append("photo", photo);
    return request("", { method: "POST", body });
  },

  // PUT /api/personnel/:id   multipart/form-data, same fields as POST plus
  //   data.removePhoto = true  -> delete the current photo (when no new file)
  // `vehicles` is the COMPLETE list: the server replaces the person's vehicles.
  // -> 200 + the updated person | 404 | 409 as in POST (ignoring this same person)
  update(id, { photo, ...data }) {
    const body = new FormData();
    body.append("data", JSON.stringify(data));
    if (photo) body.append("photo", photo);
    return request(`/${id}`, { method: "PUT", body });
  },

  // DELETE /api/personnel/:id -> 204
  remove(id) {
    return request(`/${id}`, { method: "DELETE" });
  },
};
