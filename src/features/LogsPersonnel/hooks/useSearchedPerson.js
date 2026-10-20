import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { personnelApi } from "../../ViewPersonnel/api/personnelApi";
import { normalizeText } from "../../ViewPersonnel/utils/text";
import { useDebouncedValue } from "../../../shared/hooks/useDebouncedValue";

//mono mia karta mporei na deiksei an to onoma einai one-one.
export function useSearchedPerson() {
  const search = useDebouncedValue(
    useSelector((state) => state.logs.search),
    300,
  );
  const query = normalizeText(search.trim());

  const { data: people } = useQuery({
    queryKey: ["personnel"],
    queryFn: personnelApi.getAll,
    enabled: query !== "",
    staleTime: 30_000,
    refetchInterval: 30_000, // keeps inside/outside reasonably live
  });

  return useMemo(() => {
    if (!query || !people) return null;
    const matches = people.filter((person) => person.searchKey.includes(query));
    return matches.length === 1 ? matches[0] : null;
  }, [people, query]);
}
