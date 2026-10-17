import { createSlice } from "@reduxjs/toolkit";

// NOTE: once you add react-router, replace `activePage` with the URL
// and turn the nav buttons into <NavLink>s. `sidebarOpen` stays.
const uiSlice = createSlice({
  name: "ui",
  initialState: {
    sidebarOpen: false,
    activePage: "check",
  },
  reducers: {
    openSidebar(state) {
      state.sidebarOpen = true;
    },
    closeSidebar(state) {
      state.sidebarOpen = false;
    },
    navigate(state, action) {
      state.activePage = action.payload;
      state.sidebarOpen = false;
    },
  },
});

export const { openSidebar, closeSidebar, navigate } = uiSlice.actions;
export default uiSlice.reducer;
