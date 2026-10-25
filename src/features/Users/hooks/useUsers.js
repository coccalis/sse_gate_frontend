import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { usersApi } from "../api/usersApi";
import { USERS_KEY } from "../constants";
import { filterUsers } from "../utils/filterUsers";

// Stable reference. `data ?? []` would create a NEW array on every render
// while loading, and that would make every useMemo below recompute.
const EMPTY = [];

export function useUsers() {
  return useQuery({
    queryKey: USERS_KEY,
    queryFn: usersApi.getAll,
    staleTime: 30_000,
  });
}

function useUsersList() {
  const { data } = useUsers();
  return data ?? EMPTY;
}

// Totals for the summary (always over ALL users, not the filtered ones)
export function useUserCounts() {
  const users = useUsersList();

  return useMemo(() => {
    let admins = 0;
    for (const user of users) {
      if (user.role === "admin") admins += 1;
    }
    return { total: users.length, admins, operators: users.length - admins };
  }, [users]);
}

// Search + filters. Only recomputes when the data or a filter changes,
// not when the page number changes.
export function useFilteredUsers() {
  const users = useUsersList();
  const { search, role, status } = useSelector((state) => state.users);

  return useMemo(
    () => filterUsers(users, { search, role, status }),
    [users, search, role, status]
  );
}
