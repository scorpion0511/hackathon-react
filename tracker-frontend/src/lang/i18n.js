import i18n from "i18next";
import { initReactI18next } from "react-i18next";


i18n.use(initReactI18next).init({
  ns: ["label", "message"],
  resources: {
    en: {
      label: require("./labelProperties_en"),
      message: require("./messageProperties_en")
    },
    it: {
      message: require("./messageProperties_it"),
      label: require("./labelProperties_it")
    },
    sp: {
      message: require("./messageProperties_sp"),
      label: require("./labelProperties_sp"),
    }
  },
  lng: "en", // Default language
  fallbackLng: "en", // Fallback language
  interpolation: {
    escapeValue: false // React handles escaping
  }
});

export default i18n;
