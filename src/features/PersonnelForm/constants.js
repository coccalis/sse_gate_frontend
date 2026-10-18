import { LuCar } from "react-icons/lu";
import { FaMotorcycle } from "react-icons/fa";

export const VEHICLE_TYPES = [
  { value: "car", icon: LuCar },
  { value: "motorcycle", icon: FaMotorcycle },
];

export const VEHICLE_COLORS = [
  "white",
  "black",
  "gray",
  "silver",
  "blue",
  "red",
  "green",
  "yellow",
  "orange",
  "brown",
  "other",
];

export const PHOTO_MAX_BYTES = 5 * 1024 * 1024; // 5 MB
export const PHOTO_TYPES = ["image/jpeg", "image/png"];
