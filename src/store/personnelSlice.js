import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: "",
  unit: "", // "" = all
  rank: "",
  status: "", // "" | "inside" | "outside"
  page: 1,
};

const personnelSlice = createSlice({
  name: "personnel",
  initialState,
  reducers: {
    setSearch(state, action) {
      state.search = action.payload;
      state.page = 1;
    },
    setUnit(state, action) {
      state.unit = action.payload;
      state.page = 1;
    },
    setRank(state, action) {
      state.rank = action.payload;
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

export const { setSearch, setUnit, setRank, setStatus, setPage, resetFilters } =
  personnelSlice.actions;
export default personnelSlice.reducer;
