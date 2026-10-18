import { createContext, useContext } from "react";

export const PersonnelFormContext = createContext(null);

export function usePersonnelFormContext() {
  const context = useContext(PersonnelFormContext);
  if (!context) {
    throw new Error("usePersonnelFormContext must be used inside <PersonnelForm>");
  }
  return context;
}
