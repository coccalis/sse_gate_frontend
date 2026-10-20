// Backend calls for the Logs page. If the Express route or the JSON differ
// from the ones below, this is the only file you need to change.
const BASE = "/api/logs";
const USE_MOCK = true;
// import.meta.env.DEV && import.meta.env.VITE_USE_MOCK === "true";

async function request(path = "") {
  if (USE_MOCK) {
    const { mockLogsRequest } = await import("./mockLogs");
    return mockLogsRequest(path);
  }

  const res = await fetch(`${BASE}${path}`, { credentials: "include" });
  if (!res.ok) {
    const error = new Error(`Request failed: ${res.status}`);
    error.status = res.status;
    throw error;
  }
  return res.json();
}

// Accepts both camelCase and the snake_case rows Postgres returns
const pick = (obj, camel, snake) => obj?.[camel] ?? obj?.[snake];

function mapLog(log) {
  const firstName = pick(log, "firstName", "first_name") ?? "";
  const lastName = pick(log, "lastName", "last_name") ?? "";

  return {
    id: log.id,
    timestamp: pick(log, "timestamp", "created_at"),
    direction: log.direction, // "entry" | "exit"
    personId: pick(log, "personId", "person_id"),
    firstName,
    lastName,
    fullName: `${firstName} ${lastName}`.trim(),
    rank: log.rank ?? "",
    unit: log.unit ?? "",
    cardId: pick(log, "cardId", "card_id") ?? "",
    plate: log.plate ?? null, // null = on foot
    operator: log.operator ?? "",
  };
}

export const logsApi = {
  // GET /api/logs?search=&plate=&from=YYYY-MM-DD&to=YYYY-MM-DD
  //              &direction=entry|exit&personId=&page=1&pageSize=10
  // -> { items: [{ id, timestamp, direction, personId, firstName, lastName,
  //                rank, unit, cardId, plate, operator }], total }
  // Newest first. `search` matches the name or the card number (no accents,
  // any case). `plate` matches part of the plate. from/to are inclusive days.
  async getLogs({
    search,
    plate,
    from,
    to,
    direction,
    personId,
    page = 1,
    pageSize = 10,
  } = {}) {
    const params = new URLSearchParams();
    Object.entries({
      search,
      plate,
      from,
      to,
      direction,
      personId,
      page,
      pageSize,
    }).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.set(key, String(value));
      }
    });

    const data = await request(`?${params}`);
    return {
      items: (data?.items ?? []).map(mapLog),
      total: data?.total ?? 0,
    };
  },
};
