import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    lng: "en",
    resources: {
      en: {
        translation: {
          appName: "SSE Gate Application",
          gate: "Vehicle Gate",
          section: "Workspace",
          check: "Pass Check",
          personnel: "Personnel",
          viewPersonnel: "View Personnel",
          addPersonnel: "Add Personnel",
          logs: "Logs",
          light: "Light Theme",
          dark: "Dark Theme",
          role: "Gate Officer",
          user: "Operator",
          logout: "Log out",
          openMenu: "Open menu",
          closeMenu: "Close menu",
          locale: "en-GB",
        },
      },
      el: {
        translation: {
          appName: "Εφαρμογή Πύλης ΣΣΕ",
          gate: "Πύλη Οχημάτων",
          section: "Περιβάλλον Εργασίας",
          check: "Έλεγχος Διέλευσης",
          personnel: "Προσωπικό",
          viewPersonnel: "Προβολή Προσωπικού",
          addPersonnel: "Εισαγωγή Προσωπικού",
          logs: "Καταγραφές",
          light: "Φωτεινό Θέμα",
          dark: "Σκοτεινό Θέμα",
          role: "Αξιωματικός Πύλης",
          user: "Χειριστής",
          logout: "Αποσύνδεση",
          openMenu: "Άνοιγμα μενού",
          closeMenu: "Κλείσιμο μενού",
          locale: "el-GR",
        },
      },
    },
  });
