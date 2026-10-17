import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { gateCheckEn, gateCheckEl } from "./features/CheckCredentials/locales";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: import.meta.env.DEV,
    fallbackLng: "en", // instead of lng: "en"
    supportedLngs: ["en", "el"],
    load: "languageOnly", // "en-GB" -> "en"
    interpolation: { escapeValue: false }, // React already escapes
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
          language: "Language",
          locale: "en-GB",
          //PASS CHECK PAGE
          passCheckTitle: "Check credentials",
          passCheckSubTitle:
            "Verify personnel and vehicles before granting facility access.",
          gateCheck: gateCheckEn,
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
          language: "Γλώσσα",
          locale: "el-GR",
          //PASS CHECK PAGE
          passCheckTitle: "Έλεγχος διαπιστευτηρίων",
          passCheckSubTitle:
            "Επαληθεύστε το προσωπικό και τα οχήματα πριν από την έγκριση εισόδου στις εγκαταστάσεις.",
          gateCheck: gateCheckEl,
        },
      },
    },
  });

i18n.on("languageChanged", (lng) => {
  document.documentElement.lang = lng;
});
export default i18n;
