import { LuScanLine, LuUserRoundPlus, LuUsersRound } from "react-icons/lu";
import { FiUsers } from "react-icons/fi";
import { FiUserPlus } from "react-icons/fi";
import { PiClockCounterClockwiseFill } from "react-icons/pi";

export const nav_items = [
  { id: "check", icon: LuScanLine, path: "/home" },
  { id: "viewPersonnel", icon: FiUsers, path: "/view-personnel", end: true },
  { id: "logs", icon: PiClockCounterClockwiseFill, path: "/logs" },
];

export const admin_nav_items = [
  { id: "addPersonnel", icon: FiUserPlus, path: "/personnel/new" },
  { id: "adminUsers", icon: LuUsersRound, path: "/admin/users", end: true },
  { id: "adminCreateUser", icon: LuUserRoundPlus, path: "/admin/users/new" },
];

export const nav_sections = [
  { id: "section", items: nav_items },
  { id: "adminSection", adminOnly: true, items: admin_nav_items },
];
