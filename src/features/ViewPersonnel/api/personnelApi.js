import { normalizeText } from "../utils/text";
import { normalizePlate } from "../../CheckCredentials/utils/plate";

// All backend calls for this page. If the Express routes or JSON differ from
// the ones below, this is the only file you need to change.
const BASE = "/api/personnel";
const USE_MOCK = true;
// import.meta.env.DEV && import.meta.env.VITE_USE_MOCK === "true";

async function request(path = "", options = {}) {
  if (USE_MOCK) {
    const { mockPersonnelRequest } = await import("./mockPersonnel");
    return mockPersonnelRequest(path, options);
  }

  const res = await fetch(`${BASE}${path}`, {
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
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
  }));

  return {
    id: p.id,
    firstName,
    lastName,
    fullName: `${firstName} ${lastName}`.trim(),
    cardId,
    rank: p.rank ?? "",
    unit: p.unit ?? "",
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
  //                          vehicles: [{ plate, make, model }] }]
  async getAll() {
    const data = await request();
    return Array.isArray(data) ? data.map(mapPerson) : [];
  },

  // DELETE /api/personnel/:id -> 204
  remove(id) {
    return request(`/${id}`, { method: "DELETE" });
  },
};
