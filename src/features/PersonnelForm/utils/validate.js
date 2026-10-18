import { normalizePlate } from "../../CheckCredentials/utils/plate";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const REQUIRED = ["firstName", "lastName", "rank", "unit", "cardId"];

export function validatePersonnel(values) {
  const errors = {};

  for (const field of REQUIRED) {
    if (!values[field].trim()) errors[field] = "required";
  }

  const phone = values.phone.trim();
  if (phone) {
    const digits = phone.replace(/\D/g, "");
    if (/[^\d\s+()-]/.test(phone) || digits.length < 10 || digits.length > 15) {
      errors.phone = "invalidPhone";
    }
  }

  const email = values.email.trim();
  if (email && !EMAIL.test(email)) errors.email = "invalidEmail";

  const vehicleErrors = {};
  const vehicles = [];
  const seen = new Set();

  for (const vehicle of values.vehicles) {
    const plate = normalizePlate(vehicle.plate);
    const isEmpty =
      !plate && !vehicle.make.trim() && !vehicle.model.trim() && !vehicle.color;
    if (isEmpty) continue;

    if (!plate) vehicleErrors[vehicle.key] = { plate: "required" };
    else if (plate.length < 3 || plate.length > 10)
      vehicleErrors[vehicle.key] = { plate: "plateInvalid" };
    else if (seen.has(plate))
      vehicleErrors[vehicle.key] = { plate: "plateDuplicate" };
    else {
      seen.add(plate);
      vehicles.push({
        type: vehicle.type,
        plate,
        make: vehicle.make.trim(),
        model: vehicle.model.trim(),
        color: vehicle.color,
      });
    }
  }
  if (Object.keys(vehicleErrors).length > 0) errors.vehicles = vehicleErrors;

  return {
    errors,
    payload: {
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      rank: values.rank,
      unit: values.unit,
      cardId: values.cardId.trim(),
      phone,
      email,
      vehicles,
    },
  };
}
