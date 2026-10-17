import { useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { personnelApi } from "../api/personnelApi";
import { filterPersonnel } from "../utils/filterPersonnel";

const PERSONNEL_KEY = ["personnel"];

// Stable reference. `data ?? []` would create a NEW array on every render

const EMPTY = [];

export function usePersonnel() {
  return useQuery({
    queryKey: PERSONNEL_KEY,
    queryFn: personnelApi.getAll,
    staleTime: 30_000,
    refetchInterval: 30_000, // refresh for entos ektos
  });
}

function usePersonnelList() {
  const { data } = usePersonnel();
  return data ?? EMPTY;
}

export function usePersonnelCounts() {
  const people = usePersonnelList();

  return useMemo(() => {
    let inside = 0;
    for (const person of people) {
      if (person.status === "inside") inside += 1;
    }
    return { total: people.length, inside, outside: people.length - inside };
  }, [people]);
}

export function useFilterOptions() {
  const people = usePersonnelList();

  return useMemo(() => {
    const units = new Set();
    const ranks = new Set();
    for (const person of people) {
      if (person.unit) units.add(person.unit);
      if (person.rank) ranks.add(person.rank);
    }
    const sort = (set) => [...set].sort((a, b) => a.localeCompare(b, "el"));
    return { units: sort(units), ranks: sort(ranks) };
  }, [people]);
}

export function useFilteredPersonnel() {
  const people = usePersonnelList();
  const { search, unit, rank, status } = useSelector(
    (state) => state.personnel,
  );

  return useMemo(
    () => filterPersonnel(people, { search, unit, rank, status }),
    [people, search, unit, rank, status],
  );
}

export function useDeletePersonnel() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => personnelApi.remove(id),
    onSuccess: (_, id) => {
      queryClient.setQueryData(PERSONNEL_KEY, (old) =>
        old?.filter((person) => person.id !== id),
      );
      queryClient.invalidateQueries({ queryKey: PERSONNEL_KEY });
    },
  });
}
