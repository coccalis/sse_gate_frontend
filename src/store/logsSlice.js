import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: "", // name or card number
  plate: "",
  dateFrom: "", // "YYYY-MM-DD" or ""
  dateTo: "",
  direction: "", // "" | "entry" | "exit"
  page: 1,
};

// Filters live in Redux so they survive navigating away and back.
// Changing any filter returns to page 1.
const logsSlice = createSlice({
  name: "logs",
  initialState,
  reducers: {
    setSearch(state, action) {
      state.search = action.payload;
      state.page = 1;
    },
    setPlate(state, action) {
      state.plate = action.payload;
      state.page = 1;
    },
    setDateRange(state, action) {
      state.dateFrom = action.payload.from;
      state.dateTo = action.payload.to;
      state.page = 1;
    },
    setDirection(state, action) {
      state.direction = action.payload;
      state.page = 1;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    resetFilters: () => initialState,
  },
});

export const {
  setSearch,
  setPlate,
  setDateRange,
  setDirection,
  setPage,
  resetFilters,
} = logsSlice.actions;
export default logsSlice.reducer;
