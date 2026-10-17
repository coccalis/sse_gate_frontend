import { createSlice } from "@reduxjs/toolkit";

// direction: "entry" | "exit"  (the toggle at the top of the page)
// result: null | { status: "valid" | "denied" | "error", ... }
const checkSlice = createSlice({
  name: "check",
  initialState: {
    direction: "entry",
    result: null,
  },
  reducers: {
    setDirection(state, action) {
      state.direction = action.payload;
      state.result = null; // a result belongs to the mode it was checked in
    },
    setResult(state, action) {
      state.result = action.payload;
    },
    clearResult(state) {
      state.result = null;
    },
  },
});

export const { setDirection, setResult, clearResult } = checkSlice.actions;
export default checkSlice.reducer;
