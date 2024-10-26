// i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

const API_KEY = "t-3QIfqCSgEFu7-11RKoww";
const loadPath = `https://api.i18nexus.com/project_resources/translations/{{lng}}/{{ns}}.json?api_key=${API_KEY}`;

// Создаем инстанс если его еще нет
const i18nInstance = i18n.createInstance();

if (!i18nInstance.isInitialized) {
  i18nInstance
    .use(HttpBackend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      fallbackLng: "en",
      ns: ["common", "default"],
      defaultNS: "common",
      supportedLngs: ["en", "ru"],

      backend: {
        loadPath,
      },

      detection: {
        order: ["path", "localStorage", "navigator"],
        lookupFromPathIndex: 0,
        caches: ["localStorage"],
      },

      interpolation: {
        escapeValue: false,
      },

      react: {
        useSuspense: false,
      },
    });
}

export default i18nInstance;
