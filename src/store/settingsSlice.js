import { createSlice } from "@reduxjs/toolkit";

const THEME_KEY = "gc-theme";
const LANGUAGE_KEY = "gc-language";

const getInitialTheme = () => {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === "light" || saved === "dark") return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const getInitialLanguage = () => {
  const saved = localStorage.getItem(LANGUAGE_KEY);
  return saved === "el" || saved === "en" ? saved : "el";
};

const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    theme: getInitialTheme(),
    language: getInitialLanguage(),
  },
  reducers: {
    toggleTheme(state) {
      state.theme = state.theme === "dark" ? "light" : "dark";
    },
    setLanguage(state, action) {
      state.language = action.payload;
    },
  },
});

export const { toggleTheme, setLanguage } = settingsSlice.actions;
export { THEME_KEY, LANGUAGE_KEY };
export default settingsSlice.reducer;
