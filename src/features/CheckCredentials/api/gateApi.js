// All backend calls for this page live here. If the Express routes or the
// JSON shapes are different, this is the only file you need to change.
const BASE = "/api/gate";
const USE_MOCK = true;
// import.meta.env.DEV && import.meta.env.VITE_USE_MOCK === "true";

async function request(path, options = {}) {
  console.log(USE_MOCK);
  if (USE_MOCK) {
    const { mockRequest } = await import("./mockGate");
    return mockRequest(path, options);
  }
  const res = await fetch(`${BASE}${path}`, {
    credentials: "include", // session cookie
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (res.status === 404) return { notFound: true };
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
}

// Accepts both camelCase and the snake_case rows Postgres returns
const pick = (obj, camel, snake) => obj?.[camel] ?? obj?.[snake];

function mapPerson(p) {
  if (!p) return null;
  return {
    id: p.id,
    firstName: pick(p, "firstName", "first_name"),
    lastName: pick(p, "lastName", "last_name"),
    rank: p.rank,
    unit: p.unit,
    cardId: pick(p, "cardId", "card_id"),
    photoUrl: pick(p, "photoUrl", "photo_url"),
    vehicles: (p.vehicles ?? []).map((v) => ({
      plate: v.plate,
      type: v.type,
      make: v.make,
      model: v.model,
    })),
  };
}

function mapCheckResponse(data, { method, value, direction }) {
  const base = { method, value, direction };
  if (data.notFound) {
    return { ...base, status: "denied", reason: "not_found" };
  }
  return {
    ...base,
    status: data.valid ? "valid" : "denied",
    reason: data.reason,
    person: mapPerson(data.person),
    matchedPlate: pick(data, "matchedPlate", "matched_plate"),
    checkedAt:
      pick(data, "checkedAt", "checked_at") ?? new Date().toISOString(),
  };
}

export const gateApi = {
  // POST /api/gate/scan        { cardId, direction } -> { valid, reason?, person? }
  async scanCard(cardId, direction) {
    const data = await request("/scan", {
      method: "POST",
      body: JSON.stringify({ cardId, direction }),
    });
    return mapCheckResponse(data, { method: "card", value: cardId, direction });
  },

  // POST /api/gate/check-plate { plate, direction } -> { valid, reason?, person?, matchedPlate? }
  async checkPlate(plate, direction) {
    const data = await request("/check-plate", {
      method: "POST",
      body: JSON.stringify({ plate, direction }),
    });
    return mapCheckResponse(data, { method: "plate", value: plate, direction });
  },

  // GET /api/gate/status -> { readerConnected, inside, outside }
  async getStatus() {
    const data = await request("/status");
    return {
      readerConnected: Boolean(
        pick(data, "readerConnected", "reader_connected"),
      ),
      inside: data.inside ?? 0,
      outside: data.outside ?? 0,
    };
  },

  // GET /api/gate/recent-scans?limit=3 -> [{ id, name, direction, time }]
  async getRecentScans(limit = 3) {
    const data = await request(`/recent-scans?limit=${limit}`);
    if (!Array.isArray(data)) return [];
    return data.map((s) => ({
      id: s.id,
      name:
        s.name ??
        [pick(s, "firstName", "first_name"), pick(s, "lastName", "last_name")]
          .filter(Boolean)
          .join(" "),
      direction: s.direction,
      time: s.time ?? pick(s, "createdAt", "created_at"),
    }));
  },
};
