import { configureStore } from "@reduxjs/toolkit";
import settingsReducer, { THEME_KEY, LANGUAGE_KEY } from "./settingsSlice";
import authReducer from "./authSlice";
import uiReducer from "./uiSlice";
import checkReduser from "./checkSlice";
import personnelReduser from "./personnelSlice";
import logsReduser from "./logsSlice";

export const store = configureStore({
  reducer: {
    settings: settingsReducer,
    ui: uiReducer,
    auth: authReducer,
    check: checkReduser,
    personnel: personnelReduser,
    logs: logsReduser,
  },
});

let prev;
const syncSettings = () => {
  const { theme, language } = store.getState().settings;

  if (prev?.theme !== theme) {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem(THEME_KEY, theme);
  }
  if (prev?.language !== language) {
    document.documentElement.lang = language;
    localStorage.setItem(LANGUAGE_KEY, language);
  }
  prev = { theme, language };
};

syncSettings();
store.subscribe(syncSettings);
