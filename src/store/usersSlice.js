import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: "",
  role: "", // "" = all | "admin" | "operator"
  status: "", // "" = all | "active" | "inactive"
  page: 1,
};

// Filters live in Redux so they survive going to the edit page and back.
// Changing any filter returns to page 1.
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setSearch(state, action) {
      state.search = action.payload;
      state.page = 1;
    },
    setRole(state, action) {
      state.role = action.payload;
      state.page = 1;
    },
    setStatus(state, action) {
      state.status = action.payload;
      state.page = 1;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    resetFilters: () => initialState,
  },
});

export const { setSearch, setRole, setStatus, setPage, resetFilters } =
  usersSlice.actions;
export default usersSlice.reducer;
