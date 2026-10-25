import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { gateCheckEn, gateCheckEl } from "./features/CheckCredentials/locales";
import {
  personnelListEl,
  personnelListEn,
} from "./features/ViewPersonnel/locales";
import {
  personnelFormEl,
  personnelFormEn,
} from "./features/PersonnelForm/locales";
import {
  personnelEditEl,
  personnelEditEn,
} from "./features/EditPersonnel/locales";
import { commonEn, commonEl } from "./shared/locales";
import { logsPageEn, logsPageEl } from "./features/LogsPersonnel/locales";
import { usersPageEl, usersPageEn } from "./features/Users/locales";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: import.meta.env.DEV,
    fallbackLng: "en",
    supportedLngs: ["en", "el"],
    load: "languageOnly",
    interpolation: { escapeValue: false },
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
          adminSection: "Administration",
          adminUsers: "Users",
          adminCreateUser: "Create User",
          usernameTextFiledLogin: "Username",
          passwordTextFiledLogin: "Password",
          btnLogin: "Sign In",
          secureAccessNote: "Authorized personnel only · Hellenic Army Academy",
          //PASS CHECK PAGE
          passCheckTitle: "Check credentials",
          passCheckSubTitle:
            "Verify personnel and vehicles before granting facility access.",
          gateCheck: gateCheckEn,
          personnelList: personnelListEn,
          personnelForm: personnelFormEn,
          personnelEdit: personnelEditEn,
          logsPage: logsPageEn,
          common: commonEn,
          usersPage: usersPageEn,
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
          adminSection: "Διαχειριστικό",
          adminUsers: "Χρήστες",
          adminCreateUser: "Δημιουργία Χρήστη",
          usernameTextFiledLogin: "Όνομα Χρήστη",
          passwordTextFiledLogin: "Κωδικός Πρόσβασης",
          btnLogin: "Σύνδεση",
          secureAccessNote:
            "Μόνο εξουσιοδοτημένο προσωπικό · Στρατιωτική Σχολή Ευελπίδων.",
          //PASS CHECK PAGE
          passCheckTitle: "Έλεγχος διαπιστευτηρίων",
          passCheckSubTitle:
            "Επαληθεύστε το προσωπικό και τα οχήματα πριν από την έγκριση εισόδου στις εγκαταστάσεις.",
          gateCheck: gateCheckEl,
          personnelList: personnelListEl,
          personnelForm: personnelFormEl,
          personnelEdit: personnelEditEl,
          logsPage: logsPageEl,
          common: commonEl,
          usersPage: usersPageEl,
        },
      },
    },
  });

i18n.on("languageChanged", (lng) => {
  document.documentElement.lang = lng;
});
export default i18n;
