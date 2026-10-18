import { normalizeText } from "./text";
//! na vale to plate sto shared giati twra to xreisimopoioun se 2 features
import { normalizePlate } from "../../CheckCredentials/utils/plate";

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
