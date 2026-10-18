import { formatPlate } from "../../CheckCredentials/utils/plate";
import { newVehicle } from "./formValues";

// Turns a person from the API into the shape the form uses.
// Every vehicle gets a fresh client-side key, and plates are shown formatted
// ("ΧΥΗ4821" -> "ΧΥΗ 4821"); they are normalised again on submit.
export function toFormValues(person) {
  return {
    firstName: person.firstName ?? "",
    lastName: person.lastName ?? "",
    rank: person.rank ?? "",
    unit: person.unit ?? "",
    cardId: person.cardId ?? "",
    phone: person.phone ?? "",
    email: person.email ?? "",
    vehicles: (person.vehicles ?? []).map((vehicle) => ({
      ...newVehicle(),
      type: vehicle.type ?? "car",
      plate: formatPlate(vehicle.plate ?? ""),
      make: vehicle.make ?? "",
      model: vehicle.model ?? "",
      color: vehicle.color ?? "",
    })),
  };
}
