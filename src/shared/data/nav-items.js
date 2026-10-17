import { LuScanLine } from "react-icons/lu";
import { FiUsers } from "react-icons/fi";
import { FiUserPlus } from "react-icons/fi";
import { PiClockCounterClockwiseFill } from "react-icons/pi";
import { FaRegIdBadge } from "react-icons/fa6";

export const nav_items = [
  { id: "check", icon: LuScanLine, path: "/home" },
  // { id: "personnel", icon: FaRegIdBadge },
  { id: "viewPersonnel", icon: FiUsers, path: "/view-personnel", end: true },
  { id: "addPersonnel", icon: FiUserPlus, path: "/personnel/new" },
  { id: "logs", icon: PiClockCounterClockwiseFill, path: "/logs" },
];
