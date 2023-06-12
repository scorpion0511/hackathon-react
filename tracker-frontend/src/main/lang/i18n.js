import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  ns: ["label", "message"],
  resources: {
    en: {
      label: require("./properties/labelProperties_en"),
      message: require("./messages/messageProperties_en")
    },
    it: {
      message: require("./messages/messageProperties_it"),
      label: require("./properties/labelProperties_it")
    },
    sp: {
      message: require("./messages/messageProperties_sp"),
      label: require("./properties/labelProperties_sp"),
    },
    ar: {
      message: require("./messages/messageProperties_ar"),
      label: require("./properties/labelProperties_ar"),
    }
  },
  lng: "en", // Default language
  fallbackLng: "en", // Fallback language
  interpolation: {
    escapeValue: false // React handles escaping
  }
});

export default i18n;
