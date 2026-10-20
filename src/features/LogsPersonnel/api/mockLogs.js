// Fake backend for the Logs page. Only loaded in development when
// VITE_USE_MOCK=true. It builds ~14 days of entries/exits for the same 248
// people as the personnel mock, once, and filters them like the real server
// should. State is in memory: a refresh rebuilds it.
//
// Handy triggers:
//   - type "FAIL" in the name search -> server error state
//   - people created after the first load have no logs -> empty state
import { mockPersonnelRequest } from "../../ViewPersonnel/api/mockPersonnel";
import { normalizeText } from "../../ViewPersonnel/utils/text";
import { normalizePlate } from "../../CheckCredentials/utils/plate";
import { addDays, parseISODate } from "../../../shared/utils/dates";

const DAYS = 14;
const OPERATORS = ["Αξιωματικός Πύλης", "Υπαξιωματικός Πύλης", "Φρουρός Πύλης"];

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Small deterministic random generator, so the data is the same every run
function mulberry32(seed) {
  let state = seed;
  return () => {
    state += 0x6d2b79f5;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

async function buildDataset() {
  const people = await mockPersonnelRequest();
  const now = new Date();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const events = [];

  const minutesOfDay = (daysAgo, minutes) =>
    new Date(now.getFullYear(), now.getMonth(), now.getDate() - daysAgo, 0, minutes).getTime();

  for (const person of people) {
    const searchKey = normalizeText(
      `${person.firstName} ${person.lastName} ${person.lastName} ${person.firstName} ${person.cardId}`
    );

    const base = {
      personId: person.id,
      firstName: person.firstName,
      lastName: person.lastName,
      rank: person.rank,
      unit: person.unit,
      cardId: person.cardId,
      searchKey,
    };
    const add = (ts, direction, plate, operator) =>
      events.push({ ...base, ts, direction, plate, operator });

    for (let daysAgo = 0; daysAgo < DAYS; daysAgo += 1) {
      const rand = mulberry32(person.id * 1000 + daysAgo);
      const entryMinutes = 390 + Math.floor(rand() * 240); // 06:30 - 10:30
      const exitMinutes = 840 + Math.floor(rand() * 330); // 14:00 - 19:30
      const works = rand() < 0.7;
      const vehicle = person.vehicles.length
        ? person.vehicles[Math.floor(rand() * person.vehicles.length)]
        : null;
      const plate = vehicle ? vehicle.plate : null; // null = on foot
      const entryOperator = OPERATORS[Math.floor(rand() * OPERATORS.length)];
      const exitOperator = OPERATORS[Math.floor(rand() * OPERATORS.length)];

      if (daysAgo === 0) {
        // Today: people marked "inside" entered, the others did not come yet
        if (person.status === "inside") {
          const minutes = Math.min(entryMinutes, Math.max(nowMinutes - 3, 0));
          add(minutesOfDay(0, minutes), "entry", plate, entryOperator);
        }
      } else if (works) {
        add(minutesOfDay(daysAgo, entryMinutes), "entry", plate, entryOperator);
        add(minutesOfDay(daysAgo, exitMinutes), "exit", plate, exitOperator);
      }
    }
  }

  events.sort((a, b) => b.ts - a.ts); // newest first
  return events.map((event, index) => ({ ...event, id: events.length - index }));
}

let datasetPromise;
const getDataset = () => {
  datasetPromise ??= buildDataset();
  return datasetPromise;
};

function filterEvents(events, { search, plate, from, to, direction, personId }) {
  const query = normalizeText((search ?? "").trim());
  const plateQuery = normalizePlate(plate ?? "");
  const fromTs = from ? parseISODate(from).getTime() : null;
  const toTs = to ? addDays(parseISODate(to), 1).getTime() : null; // `to` is inclusive

  return events.filter(
    (event) =>
      (!personId || event.personId === personId) &&
      (!direction || event.direction === direction) &&
      (!query || event.searchKey.includes(query)) &&
      (!plateQuery || (event.plate && normalizePlate(event.plate).includes(plateQuery))) &&
      (fromTs === null || event.ts >= fromTs) &&
      (toTs === null || event.ts < toTs)
  );
}

export async function mockLogsRequest(path = "") {
  const [, query = ""] = path.split("?");
  const params = Object.fromEntries(new URLSearchParams(query));

  const dataset = await getDataset();
  await delay(450);
  if (params.search === "FAIL") throw new Error("Mock: logs failed");

  const filtered = filterEvents(dataset, {
    search: params.search,
    plate: params.plate,
    from: params.from,
    to: params.to,
    direction: params.direction,
    personId: params.personId ? Number(params.personId) : null,
  });

  const page = Math.max(1, Number(params.page) || 1);
  const pageSize = Math.max(1, Number(params.pageSize) || 10);

  return {
    items: filtered
      .slice((page - 1) * pageSize, page * pageSize)
      .map(({ ts, searchKey, ...event }) => ({
        ...event,
        timestamp: new Date(ts).toISOString(),
      })),
    total: filtered.length,
  };
}
