import { normalizeText } from "../../ViewPersonnel/utils/text";

// Pure function. `searchKey` (name + email, no accents) is computed once per
// fetch in usersApi.js, so filtering only does cheap `includes`.
export function filterUsers(users, { search, role, status }) {
  const query = normalizeText(search.trim());

  return users.filter((user) => {
    if (role && user.role !== role) return false;
    if (status && user.status !== status) return false;
    return !query || user.searchKey.includes(query);
  });
}
