import { normalizeText } from "./text";
// TIP: move plate.js to src/shared/utils later, it is used by two features now
import { normalizePlate } from "../../CheckCredentials/utils/plate";

// Pure function (easy to test). `searchKey` and `plateKeys` are computed once
// per fetch in personnelApi.js, so filtering only does cheap `includes`.
export function filterPersonnel(people, { search, unit, rank, status }) {
  const query = normalizeText(search.trim());
  const plateQuery = normalizePlate(search); // XYH 4821 -> ΧΥΗ4821

  return people.filter((person) => {
    if (unit && person.unit !== unit) return false;
    if (rank && person.rank !== rank) return false;
    if (status && person.status !== status) return false;
    if (!query) return true;

    return (
      person.searchKey.includes(query) ||
      (plateQuery !== "" &&
        person.plateKeys.some((key) => key.includes(plateQuery)))
    );
  });
}
